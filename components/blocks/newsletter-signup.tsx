'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setEmail('');
        toast.success('Inscription réussie !', {
          description: 'Vous recevrez nos meilleurs articles directement dans votre boîte mail.'
        });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        toast.error('Erreur d\'inscription', {
          description: data.error || 'Une erreur est survenue.'
        });
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      toast.error('Erreur de connexion', {
        description: 'Impossible de se connecter au serveur.'
      });
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#A543F1]/10 to-[#c5cbf9]/10 p-8 rounded-2xl border border-[#A543F1]/20">
      <div className="text-center max-w-2xl mx-auto">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white font-[family-name:var(--font-heading)]">
          Restez informé des dernières tendances
        </h3>
        <p className="text-gray-600 dark:text-white/60 mb-6 font-[family-name:var(--font-sans)]">
          Recevez nos meilleurs articles directement dans votre boîte mail. Pas de spam, promis.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            required
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 px-5 py-3 rounded-lg bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[#A543F1]/50 focus:border-[#A543F1] font-[family-name:var(--font-sans)] disabled:opacity-70 disabled:cursor-not-allowed transition-all"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="px-6 py-3 bg-[#A543F1] text-white rounded-lg font-medium hover:bg-[#A543F1]/90 transition-colors font-[family-name:var(--font-heading)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {status === 'loading' ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Envoi...
              </>
            ) : status === 'success' ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Inscrit !
              </>
            ) : (
              "S'abonner"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
