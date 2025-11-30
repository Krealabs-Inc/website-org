import { Cpu, Fingerprint, Pencil, Settings2, Sparkles, Zap } from 'lucide-react'

export function Features() {
    return (
        <section className="py-12 md:py-20 bg-white dark:bg-[#030303] transition-colors">
            <div className="mx-auto max-w-7xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-balance text-4xl font-medium lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/80">Notre approche du developpement</h2>
                    <p className="text-gray-600 dark:text-white/40">Krealabs combine expertise technique et creativite pour livrer des solutions digitales performantes et scalables.</p>
                </div>

                <div className="relative mx-auto grid max-w-2xl lg:max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Zap className="size-4 text-[#A543F1]" />
                            <h3 className="text-sm font-medium">Ultra-rapide</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-white/60">Des applications optimisees avec des temps de reponse inferieurs a 100ms et scores Lighthouse parfaits.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Cpu className="size-4 text-[#A543F1]" />
                            <h3 className="text-sm font-medium">Architecture robuste</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-white/60">Infrastructure scalable pensee pour supporter votre croissance et evoluer avec vos besoins.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Fingerprint className="size-4 text-[#A543F1]" />
                            <h3 className="text-sm font-medium">Securite renforcee</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-white/60">Protection des donnees et conformite RGPD integrees des la conception de votre projet.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Pencil className="size-4 text-[#A543F1]" />
                            <h3 className="text-sm font-medium">Sur mesure</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-white/60">Solutions entierement personnalisees adaptees a vos processus metier et identite de marque.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Settings2 className="size-4 text-[#A543F1]" />
                            <h3 className="text-sm font-medium">Controle total</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-white/60">Code source livre, documentation complete et formation pour une autonomie maximale.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-4 text-[#A543F1]" />
                            <h3 className="text-sm font-medium">Innovation IA</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-white/60">Integration d'intelligence artificielle pour automatiser et optimiser vos processus.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}