import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Journal & expertise web",
  description:
    "Articles techniques, retours d'expérience et veille sur Next.js, React Native, TypeScript et l'écosystème web moderne. Le journal de l'agence Krealabs à Rouen.",
  keywords: [
    "blog développement web rouen",
    "articles next.js",
    "tutoriels react",
    "veille technique normandie",
  ],
  alternates: { canonical: "https://krealabs.fr/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
