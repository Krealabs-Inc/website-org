'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'

export default function FAQSection() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'Quels sont vos delais de livraison ?',
            answer: 'Les delais varient selon la complexite du projet. Un site vitrine simple prend 2-3 semaines, un site avec CMS 4-6 semaines, et les projets sur mesure sont evalues au cas par cas. Nous etablissons un planning detaille en debut de projet.',
        },
        {
            id: 'item-2',
            question: 'Quelles technologies utilisez-vous ?',
            answer: 'Nous sommes specialises en React, Next.js pour le web, et React Native pour le mobile. Nous utilisons TypeScript pour la qualite du code, et des outils modernes comme Tailwind CSS, Framer Motion, et divers CMS headless selon vos besoins.',
        },
        {
            id: 'item-3',
            question: 'Proposez-vous de la maintenance apres livraison ?',
            answer: 'Oui, tous nos projets incluent une periode de support gratuit (1 a 12 mois selon la formule). Nous proposons egalement des contrats de maintenance mensuels pour les mises a jour, corrections de bugs, et evolutions de votre projet.',
        },
        {
            id: 'item-4',
            question: 'Fournissez-vous le code source ?',
            answer: 'Absolument ! Vous recevez l\'integralite du code source de votre projet. Nous utilisons Git pour le versioning et vous donnons acces au repository. Vous etes proprietaire a 100% de votre code.',
        },
        {
            id: 'item-5',
            question: 'Comment se deroule un projet avec vous ?',
            answer: 'Notre processus en 5 etapes : 1) Decouverte et cadrage de vos besoins, 2) Design UI/UX et maquettes, 3) Developpement avec points reguliers, 4) Tests et optimisation, 5) Mise en ligne et formation. Vous etes implique a chaque etape.',
        },
        {
            id: 'item-6',
            question: 'Gerez-vous l\'hebergement et le nom de domaine ?',
            answer: 'Nous vous conseillons sur les meilleures solutions d\'hebergement (Vercel, AWS, etc.) et pouvons gerer la configuration initiale. Pour le nom de domaine, nous vous guidons dans l\'achat et configurons tous les parametres DNS necessaires.',
        },
        {
            id: 'item-7',
            question: 'Puis-je voir des exemples de vos realisations ?',
            answer: 'Bien sur ! Contactez-nous pour consulter notre portfolio complet avec des etudes de cas detaillees. Nous pouvons vous montrer des projets similaires au votre et vous mettre en contact avec nos clients si besoin.',
        },
        {
            id: 'item-8',
            question: 'Travaillez-vous avec des startups ?',
            answer: 'Oui, nous accompagnons regulierement des startups dans le developpement de leur MVP et leur croissance. Nous proposons des formules adaptees aux budgets de demarrage et pouvons evoluer avec vous au fil de vos levees de fonds.',
        },
    ]

    return (
        <section className="py-16 md:py-24 bg-white dark:bg-[#030303] transition-colors">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-balance text-2xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/80 bg-clip-text text-transparent">
                        Questions Frequentes
                    </h2>
                    <p className="text-gray-600 dark:text-white/40 mt-4 text-balance">
                        Trouvez rapidement des reponses aux questions courantes sur nos services, notre processus de travail et nos technologies.
                    </p>
                </div>

                <div className="mx-auto mt-12 max-w-xl">
                    <Accordion
                        type="single"
                        collapsible
                        className="bg-white dark:bg-[#0a0a0a] w-full rounded-2xl border border-gray-200 dark:border-white/[0.08] px-8 py-3 shadow-sm ring-4 ring-gray-100 dark:ring-transparent">
                        {faqItems.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className="border-dashed border-gray-200 dark:border-white/[0.08]">
                                <AccordionTrigger className="cursor-pointer text-base hover:no-underline text-gray-900 dark:text-white">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-base text-gray-600 dark:text-gray-400">{item.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <p className="text-gray-600 dark:text-white/40 mt-6 px-8 text-center">
                        Vous ne trouvez pas la réponse ? Contactez notre{' '}
                        <Link
                            href="/contact"
                            className="text-[#A543F1] font-medium hover:underline">
                            équipe
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}
