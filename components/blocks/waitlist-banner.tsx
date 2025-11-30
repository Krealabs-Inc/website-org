'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { toast } from 'sonner'

export default function WaitlistBanner() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setStatus('loading')

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            if (response.ok) {
                setStatus('success')
                setEmail('')
                toast.success('Inscription réussie !', {
                    description: 'Nous vous contacterons très bientôt.'
                })
                setTimeout(() => setStatus('idle'), 3000)
            } else {
                const data = await response.json()
                toast.error('Erreur d\'inscription', {
                    description: data.error || 'Une erreur est survenue.'
                })
                setStatus('idle')
            }
        } catch (error) {
            console.error('Error:', error)
            toast.error('Erreur de connexion', {
                description: 'Impossible de se connecter au serveur.'
            })
            setStatus('idle')
        }
    }

    return (
        <section className="relative py-8 bg-white dark:bg-black overflow-hidden transition-colors">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center justify-between gap-8 max-w-7xl mx-auto"
                >
                    <div className="flex-1 flex items-center gap-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A543F1]/10 dark:bg-white/10 backdrop-blur-sm border border-[#A543F1]/20 dark:border-white/20">
                            <Sparkles className="w-4 h-4 text-[#A543F1]" />
                            <span className="text-sm text-gray-900 dark:text-white font-medium">Rejoignez-nous</span>
                        </div>

                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                                Pret a transformer votre idee en realite ?
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-white/70 mt-1">
                                Estimation gratuite - Reponse sous 24h
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="votre@email.com"
                                required
                                disabled={status === 'loading' || status === 'success'}
                                className="w-64 px-5 py-3 rounded-full bg-gray-100 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#A543F1] focus:border-transparent disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                            />
                            <motion.button
                                type="submit"
                                disabled={status === 'loading' || status === 'success'}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 rounded-full bg-[#A543F1] text-white font-semibold hover:bg-[#A543F1]/90 focus:outline-none focus:ring-2 focus:ring-[#A543F1] focus:ring-offset-2 focus:ring-offset-black disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg whitespace-nowrap"
                            >
                                {status === 'loading' ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Envoi...
                                    </span>
                                ) : status === 'success' ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Envoye !
                                    </span>
                                ) : (
                                    "Commencer"
                                )}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>

                {status === 'success' && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 text-gray-600 dark:text-white/90 text-sm text-center"
                    >
                        Merci ! Nous vous contacterons tres bientot.
                    </motion.p>
                )}
            </div>
        </section>
    )
}
