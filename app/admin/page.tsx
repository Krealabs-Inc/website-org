'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  Mail,
  Users,
  FileText,
  Send,
  Filter,
  Search,
  Calendar,
  Building,
  Phone,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WaitlistContact {
  id: string;
  email: string;
  source: string;
  createdAt: string;
}

interface ContactForm {
  id: string;
  requestType: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  pricingOption?: string;
  message: string;
  filesCount: number;
  createdAt: string;
}

interface ContactsData {
  waitlistContacts: WaitlistContact[];
  contactForms: ContactForm[];
  stats: {
    totalWaitlist: number;
    totalForms: number;
    total: number;
  };
}

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState<ContactsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'waitlist' | 'forms'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [newsletterSubject, setNewsletterSubject] = useState('');
  const [newsletterContent, setNewsletterContent] = useState('');
  const [newsletterRecipients, setNewsletterRecipients] = useState<'all' | 'waitlist' | 'forms'>('all');
  const [sending, setSending] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setData(result.data);
        setIsAuthenticated(true);
      } else {
        alert('Authentification échouée');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      alert('Erreur lors de la récupération des contacts');
    }
    setLoading(false);
  };

  const handleExport = async (type: 'all' | 'waitlist' | 'forms') => {
    try {
      const response = await fetch(`/api/admin/contacts?type=${type}&format=csv`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `contacts-${type}-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Erreur lors de l\'export');
      }
    } catch (error) {
      console.error('Error exporting:', error);
      alert('Erreur lors de l\'export');
    }
  };

  const handleSendNewsletter = async () => {
    if (!newsletterSubject || !newsletterContent) {
      alert('Veuillez remplir le sujet et le contenu');
      return;
    }

    setSending(true);
    try {
      const response = await fetch('/api/admin/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject: newsletterSubject,
          htmlContent: newsletterContent,
          recipients: newsletterRecipients,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        setNewsletterSubject('');
        setNewsletterContent('');
        setShowNewsletter(false);
      } else {
        alert(`Erreur: ${result.error}`);
      }
    } catch (error) {
      console.error('Error sending newsletter:', error);
      alert('Erreur lors de l\'envoi de la newsletter');
    }
    setSending(false);
  };

  const filteredWaitlist = data?.waitlistContacts.filter(contact =>
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const filteredForms = data?.contactForms.filter(form =>
    form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.company?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-white dark:bg-[#030303] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-[family-name:var(--font-heading)]">
              Admin Dashboard
            </h1>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                  Token d'authentification
                </label>
                <Input
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Entrez votre token admin"
                  onKeyPress={(e) => e.key === 'Enter' && fetchContacts()}
                />
              </div>
              <Button
                onClick={fetchContacts}
                disabled={loading || !token}
                className="w-full"
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#030303] pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 font-[family-name:var(--font-heading)]">
              Dashboard Admin
            </h1>
            <p className="text-gray-600 dark:text-white/70">
              Gérez vos contacts et envoyez des newsletters
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-lg p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#A543F1]/10 rounded-lg">
                  <Users className="w-6 h-6 text-[#A543F1]" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-white/70">Total Contacts</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {data?.stats.total || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-lg p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#A543F1]/10 rounded-lg">
                  <Mail className="w-6 h-6 text-[#A543F1]" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-white/70">Waitlist</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {data?.stats.totalWaitlist || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-lg p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#A543F1]/10 rounded-lg">
                  <FileText className="w-6 h-6 text-[#A543F1]" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-white/70">Formulaires</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {data?.stats.totalForms || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button onClick={() => handleExport('all')} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter tout (CSV)
            </Button>
            <Button onClick={() => handleExport('waitlist')} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter Waitlist
            </Button>
            <Button onClick={() => handleExport('forms')} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter Formulaires
            </Button>
            <Button
              onClick={() => setShowNewsletter(!showNewsletter)}
              className="ml-auto"
            >
              <Send className="w-4 h-4 mr-2" />
              {showNewsletter ? 'Masquer' : 'Envoyer Newsletter'}
            </Button>
          </div>

          {/* Newsletter Form */}
          {showNewsletter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-lg p-6 mb-8"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Envoyer une Newsletter
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                    Destinataires
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="all"
                        checked={newsletterRecipients === 'all'}
                        onChange={(e) => setNewsletterRecipients(e.target.value as any)}
                        className="mr-2"
                      />
                      <span className="text-gray-700 dark:text-white/70">Tous</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="waitlist"
                        checked={newsletterRecipients === 'waitlist'}
                        onChange={(e) => setNewsletterRecipients(e.target.value as any)}
                        className="mr-2"
                      />
                      <span className="text-gray-700 dark:text-white/70">Waitlist uniquement</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="forms"
                        checked={newsletterRecipients === 'forms'}
                        onChange={(e) => setNewsletterRecipients(e.target.value as any)}
                        className="mr-2"
                      />
                      <span className="text-gray-700 dark:text-white/70">Formulaires uniquement</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                    Sujet
                  </label>
                  <Input
                    value={newsletterSubject}
                    onChange={(e) => setNewsletterSubject(e.target.value)}
                    placeholder="Sujet de la newsletter"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                    Contenu HTML
                  </label>
                  <textarea
                    value={newsletterContent}
                    onChange={(e) => setNewsletterContent(e.target.value)}
                    placeholder="Contenu HTML de la newsletter"
                    className="w-full h-48 px-3 py-2 border border-gray-300 dark:border-white/10 rounded-lg bg-white dark:bg-[#030303] text-gray-900 dark:text-white"
                  />
                </div>

                <Button
                  onClick={handleSendNewsletter}
                  disabled={sending || !newsletterSubject || !newsletterContent}
                  className="w-full"
                >
                  {sending ? 'Envoi en cours...' : 'Envoyer la newsletter'}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher..."
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
                size="sm"
              >
                Tous
              </Button>
              <Button
                variant={filter === 'waitlist' ? 'default' : 'outline'}
                onClick={() => setFilter('waitlist')}
                size="sm"
              >
                Waitlist
              </Button>
              <Button
                variant={filter === 'forms' ? 'default' : 'outline'}
                onClick={() => setFilter('forms')}
                size="sm"
              >
                Formulaires
              </Button>
            </div>
          </div>

          {/* Waitlist Contacts */}
          {(filter === 'all' || filter === 'waitlist') && filteredWaitlist.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Contacts Waitlist ({filteredWaitlist.length})
              </h2>
              <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-white/5">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white/50 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white/50 uppercase tracking-wider">
                          Source
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white/50 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                      {filteredWaitlist.map((contact) => (
                        <tr key={contact.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {contact.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-white/70">
                            {contact.source}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-white/70">
                            {new Date(contact.createdAt).toLocaleDateString('fr-FR')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Contact Forms */}
          {(filter === 'all' || filter === 'forms') && filteredForms.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Formulaires de Contact ({filteredForms.length})
              </h2>
              <div className="space-y-4">
                {filteredForms.map((form) => (
                  <div
                    key={form.id}
                    className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-lg p-6"
                  >
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-[#A543F1]/10 text-[#A543F1] rounded-full text-sm font-medium">
                          {form.requestType}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-white/70">
                          {new Date(form.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-white/70 mb-1">Nom</p>
                        <p className="text-gray-900 dark:text-white font-medium">{form.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-white/70 mb-1">Email</p>
                        <p className="text-gray-900 dark:text-white font-medium">{form.email}</p>
                      </div>
                      {form.phone && (
                        <div>
                          <p className="text-sm text-gray-600 dark:text-white/70 mb-1">Téléphone</p>
                          <p className="text-gray-900 dark:text-white font-medium">{form.phone}</p>
                        </div>
                      )}
                      {form.company && (
                        <div>
                          <p className="text-sm text-gray-600 dark:text-white/70 mb-1">Entreprise</p>
                          <p className="text-gray-900 dark:text-white font-medium">{form.company}</p>
                        </div>
                      )}
                      {form.pricingOption && (
                        <div>
                          <p className="text-sm text-gray-600 dark:text-white/70 mb-1">Budget</p>
                          <p className="text-gray-900 dark:text-white font-medium">{form.pricingOption}</p>
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 dark:text-white/70 mb-2">Message</p>
                      <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-white/5 p-4 rounded-lg">
                        {form.message}
                      </p>
                    </div>

                    {form.filesCount > 0 && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/70">
                        <FileText className="w-4 h-4" />
                        {form.filesCount} fichier{form.filesCount > 1 ? 's' : ''} joint{form.filesCount > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
