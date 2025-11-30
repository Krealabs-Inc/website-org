import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated, getAdminAuthError } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  // Check authentication
  if (!isAdminAuthenticated(request)) {
    return getAdminAuthError();
  }

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';
    const format = searchParams.get('format') || 'json';

    let waitlistContacts = [];
    let contactForms = [];

    if (type === 'all' || type === 'waitlist') {
      waitlistContacts = await prisma.waitlistContact.findMany({
        orderBy: { createdAt: 'desc' },
      });
    }

    if (type === 'all' || type === 'forms') {
      contactForms = await prisma.contactForm.findMany({
        orderBy: { createdAt: 'desc' },
      });
    }

    // Export as CSV
    if (format === 'csv') {
      let csv = '';

      if (type === 'all' || type === 'waitlist') {
        csv += 'Type,Email,Source,Date\n';
        waitlistContacts.forEach(contact => {
          csv += `Waitlist,${contact.email},${contact.source},${contact.createdAt.toISOString()}\n`;
        });
      }

      if (type === 'all' || type === 'forms') {
        if (csv) csv += '\n';
        csv += 'Type,Nom,Email,Téléphone,Entreprise,Type de demande,Budget,Message,Fichiers,Date\n';
        contactForms.forEach(form => {
          csv += `Contact,${form.name},${form.email},${form.phone || ''},${form.company || ''},${form.requestType},${form.pricingOption || ''},"${form.message.replace(/"/g, '""')}",${form.filesCount},${form.createdAt.toISOString()}\n`;
        });
      }

      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="contacts-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    }

    // Return JSON
    return NextResponse.json({
      success: true,
      data: {
        waitlistContacts,
        contactForms,
        stats: {
          totalWaitlist: waitlistContacts.length,
          totalForms: contactForms.length,
          total: waitlistContacts.length + contactForms.length,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des contacts' },
      { status: 500 }
    );
  }
}
