'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Menu, X, Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin';
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#030303]/80 backdrop-blur-lg border-b border-gray-200 dark:border-white/10"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/admin"
            className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white font-[family-name:var(--font-heading)]"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#A543F1] to-[#8b35d1] rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="hidden sm:inline">Admin Dashboard</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Retour au site
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-200 dark:border-white/10"
          >
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2 px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-4 h-4" />
                Retour au site
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2 justify-center"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
