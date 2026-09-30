import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Journal & expertise web",
  description:
    "Articles techniques, retours d'expérience et veille sur Next.js, React Native, TypeScript et l'écosystème web moderne. Le journal de l'agence Krealabs à Rouen.",
  alternates: { canonical: "https://krealabs.fr/blog" },
  openGraph: {
    title: "Blog - Journal & expertise web - Krealabs",
    description:
      "Articles techniques, retours d'expérience et veille sur Next.js, React Native, TypeScript et l'écosystème web moderne. Le journal de l'agence Krealabs à Rouen.",
    url: "https://krealabs.fr/blog",
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
