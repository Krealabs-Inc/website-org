import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Settings2, Sparkles, Zap } from 'lucide-react'
import { ReactNode } from 'react'

export function Features() {
    return (
        <section className="py-16 md:py-32 bg-white dark:bg-[#030303] transition-colors">
            <div className="@container mx-auto max-w-7xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-2xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/80 bg-clip-text text-transparent">
                        Pourquoi choisir Krealabs ?
                    </h2>
                    <p className="mt-4 text-gray-600 dark:text-white/40">
                        Une approche moderne du developpement web et mobile, centree sur la performance et l'experience utilisateur.
                    </p>
                </div>
                <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
                    <Card className="group border-0 bg-gray-50 dark:bg-[#0a0a0a] shadow-none">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Zap className="size-6 text-[#A543F1]" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium text-gray-900 dark:text-white">Performance optimale</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Temps de chargement &lt; 2s, scores Lighthouse parfaits et optimisation Core Web Vitals pour un SEO au top.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="group border-0 bg-gray-50 dark:bg-[#0a0a0a] shadow-none">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Settings2 className="size-6 text-[#A543F1]" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium text-gray-900 dark:text-white">Code source inclus</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Vous etes proprietaire a 100% de votre code. Architecture scalable et maintenable avec TypeScript.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="group border-0 bg-gray-50 dark:bg-[#0a0a0a] shadow-none">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Sparkles className="size-6 text-[#A543F1]" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium text-gray-900 dark:text-white">Technologies modernes</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                React, Next.js, React Native et les meilleurs outils du marche pour des applications evolutives.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div aria-hidden className="relative mx-auto size-36 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
        <div className="absolute inset-0 [--border:black] dark:[--border:white] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-10"/>
        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l">{children}</div>
    </div>
)
