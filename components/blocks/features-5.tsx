import { Activity, DraftingCompass, Mail, Zap } from 'lucide-react'

export function Features() {
    return (
        <section className="py-16 md:py-32 bg-gray-50 dark:bg-[#030303] transition-colors">
            <div className="mx-auto max-w-xl md:max-w-6xl px-6">
                <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
                    <div className="lg:col-span-2">
                        <div className="md:pr-6 lg:pr-0">
                            <h2 className="text-4xl font-semibold lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/80">Accompagnement premium pour votre projet</h2>
                            <p className="mt-6 text-gray-600 dark:text-white/40">Un suivi personnalise tout au long du developpement avec une equipe reactive et a votre ecoute.</p>
                        </div>
                        <ul className="mt-8 divide-y border-y *:flex *:items-center *:gap-3 *:py-3">
                            <li className="text-gray-700 dark:text-white/70">
                                <Mail className="size-5 text-[#A543F1]" />
                                Support email et visio
                            </li>
                            <li className="text-gray-700 dark:text-white/70">
                                <Zap className="size-5 text-[#A543F1]" />
                                Reponse sous 24h garantie
                            </li>
                            <li className="text-gray-700 dark:text-white/70">
                                <Activity className="size-5 text-[#A543F1]" />
                                Monitoring et analytics
                            </li>
                            <li className="text-gray-700 dark:text-white/70">
                                <DraftingCompass className="size-5 text-[#A543F1]" />
                                Revue d'architecture
                            </li>
                        </ul>
                    </div>
                    <div className="border-border/50 relative rounded-3xl border p-3 lg:col-span-3 bg-white dark:bg-black">
                        <div className="bg-gradient-to-b aspect-76/59 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
                            <img src="https://tailark.com/_next/image?url=%2Fpayments.png&w=3840&q=75" className="hidden rounded-[15px] dark:block" alt="payments illustration dark" width={1207} height={929} />
                            <img src="https://tailark.com/_next/image?url=%2Fpayments-light.png&w=3840&q=75" className="rounded-[15px] shadow dark:hidden" alt="payments illustration light" width={1207} height={929} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
