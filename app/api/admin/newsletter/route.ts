import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import { isAdminAuthenticated, getAdminAuthError } from '@/lib/admin-auth';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  // Check authentication
  if (!isAdminAuthenticated(request)) {
    return getAdminAuthError();
  }

  try {
    const { subject, htmlContent, recipients } = await request.json();

    if (!subject || !htmlContent) {
      return NextResponse.json(
        { error: 'Sujet et contenu requis' },
        { status: 400 }
      );
    }

    let emails: string[] = [];

    // Get recipients based on filter
    if (recipients === 'all' || recipients === 'waitlist') {
      const waitlistContacts = await prisma.waitlistContact.findMany({
        select: { email: true },
      });
      emails = [...emails, ...waitlistContacts.map(c => c.email)];
    }

    if (recipients === 'all' || recipients === 'forms') {
      const contactForms = await prisma.contactForm.findMany({
        select: { email: true },
      });
      emails = [...emails, ...contactForms.map(c => c.email)];
    }

    // Remove duplicates
    emails = [...new Set(emails)];

    if (emails.length === 0) {
      return NextResponse.json(
        { error: 'Aucun destinataire trouvé' },
        { status: 400 }
      );
    }

    // Send emails in batches using Resend Batch API
    // Resend allows up to 100 recipients per batch
    const batchSize = 100;
    const batches = [];

    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      batches.push(batch);
    }

    const results = [];
    for (const batch of batches) {
      try {
        const { data, error } = await resend.emails.send({
          from: 'Kréalabs <noreply@krealabs.fr>',
          to: batch,
          subject: subject,
          html: htmlContent,
        });

        if (error) {
          console.error('Resend batch error:', error);
          results.push({ success: false, error, count: batch.length });
        } else {
          results.push({ success: true, data, count: batch.length });
        }
      } catch (error) {
        console.error('Error sending batch:', error);
        results.push({ success: false, error, count: batch.length });
      }
    }

    const successCount = results
      .filter(r => r.success)
      .reduce((acc, r) => acc + r.count, 0);

    return NextResponse.json({
      success: true,
      message: `Newsletter envoyée à ${successCount} sur ${emails.length} destinataires`,
      details: {
        total: emails.length,
        sent: successCount,
        failed: emails.length - successCount,
        batches: results.length,
      },
    });
  } catch (error) {
    console.error('Error sending newsletter:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de la newsletter' },
      { status: 500 }
    );
  }
}
