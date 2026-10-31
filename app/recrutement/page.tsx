import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Recrutement - Agence web à Rouen",
  description:
    "Aucun poste ouvert pour le moment chez Krealabs, agence web à Rouen. Développeur, designer ou alternant en Normandie : vous pouvez tout de même nous écrire.",
  alternates: { canonical: "https://krealabs.fr/recrutement" },
  openGraph: {
    title: "Recrutement - Krealabs, agence web Rouen",
    description:
      "Aucun poste ouvert pour le moment. Vous pouvez tout de même nous écrire.",
    url: "https://krealabs.fr/recrutement",
    type: "website",
  },
};

export default function RecrutementPage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" aria-hidden />
        <Container className="relative">
          <div className="max-w-4xl">
            <Eyebrow dot className="mb-8">Recrutement · Rouen</Eyebrow>
            <h1 className="text-display">
              Aucun poste ouvert,
              <br />
              <em>pour le moment</em>.
            </h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">
              L’équipe est au complet aujourd’hui. Si vous développez, designez
              ou démarrez dans le web et que notre façon de travailler vous
              parle, vous pouvez tout de même nous écrire : votre message sera
              lu.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button size="lg" asChild>
                <a href="mailto:contact@krealabs.fr?subject=Candidature%20spontan%C3%A9e">
                  Envoyer ma candidature spontanée
                  <ArrowRight />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/equipe">Voir avec qui vous travailleriez</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* CE QUI VOUS ATTEND */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mb-16">
            <Eyebrow className="mb-6">Le jour où un poste s’ouvrira</Eyebrow>
            <h2 className="text-h1">
              Ce que vous <em>trouverez</em> ici.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {POINTS.map((point) => (
              <div key={point.title} className="editorial-note">
                <p className="text-eyebrow text-[var(--accent)] mb-4">{point.label}</p>
                <h3 className="text-h4 mb-2">{point.title}</h3>
                <p className="text-body-sm text-[var(--muted-foreground)]">{point.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CANDIDATURE SPONTANÉE */}
      <section className="section-y border-t border-[var(--border)]">
        <Container size="narrow">
          <div className="max-w-3xl">
            <Eyebrow className="mb-6">Candidature spontanée</Eyebrow>
            <h2 className="text-h2 mb-6">
              Vous voulez <em>vous présenter</em> quand même ?
            </h2>
            <p className="text-body text-[var(--muted-foreground)] mb-4 leading-relaxed">
              Écrivez à{" "}
              <a
                href="mailto:contact@krealabs.fr?subject=Candidature%20spontan%C3%A9e"
                className="underline underline-offset-2 hover:text-[var(--foreground)]"
              >
                contact@krealabs.fr
              </a>{" "}
              avec quelques lignes sur vous, ce que vous aimez construire et un
              lien vers votre travail : portfolio, GitHub, site ou projet
              personnel. Inutile de soigner une lettre de motivation, un
              projet concret vous présente mieux.
            </p>
            <p className="text-body text-[var(--muted-foreground)] leading-relaxed">
              Vous êtes une entreprise et vous cherchez plutôt à faire avancer
              votre projet ?{" "}
              <Link
                href="/contact"
                className="underline underline-offset-2 hover:text-[var(--foreground)]"
              >
                Parlez-nous de votre besoin
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}

const POINTS = [
  {
    label: "Contact direct",
    title: "Vous parlez aux clients",
    description:
      "Pas de chef de projet entre vous et les personnes pour qui vous construisez. Vous comprenez le besoin à la source.",
  },
  {
    label: "Des projets variés",
    title: "Vous ne faites pas deux fois le même site",
    description:
      "Sites WordPress, applications Next.js, apps mobiles React Native : chaque projet part du besoin du client, pas d’un modèle.",
  },
  {
    label: "Du code qui dure",
    title: "Vous livrez en production",
    description:
      "Votre travail est mis en ligne, utilisé et maintenu. Le code est propre, documenté et remis au client.",
  },
];
