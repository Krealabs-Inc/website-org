'use client';

import Link from 'next/link';
import { Shield, FileText, BookOpen } from 'lucide-react';

export function AdminFooter() {
  return (
    <footer className="bg-white dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-white/10 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#A543F1] to-[#8b35d1] rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white font-[family-name:var(--font-heading)]">
                Admin Dashboard
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-white/70">
              Gérez vos contacts et newsletters en toute simplicité.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Liens rapides
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/admin"
                className="text-sm text-gray-600 dark:text-white/70 hover:text-[#A543F1] dark:hover:text-[#A543F1] transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/"
                className="text-sm text-gray-600 dark:text-white/70 hover:text-[#A543F1] dark:hover:text-[#A543F1] transition-colors"
              >
                Retour au site
              </Link>
            </div>
          </div>

          {/* Documentation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Documentation
            </h3>
            <div className="flex flex-col gap-2">
              <a
                href="/ADMIN_GUIDE.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-white/70 hover:text-[#A543F1] dark:hover:text-[#A543F1] transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Guide Admin
              </a>
              <a
                href="/DATABASE_SETUP.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-white/70 hover:text-[#A543F1] dark:hover:text-[#A543F1] transition-colors flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Base de données
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-white/70">
              © {new Date().getFullYear()} Kréalabs. Tous droits réservés.
            </p>
            <p className="text-xs text-gray-500 dark:text-white/50">
              Dashboard d'administration sécurisé
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
