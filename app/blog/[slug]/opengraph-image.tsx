import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { blogPosts } from "@/lib/blog-data";

export const runtime = "nodejs";
export const alt = "Article du blog Krealabs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * OG image dynamique par article : titre, catégorie, auteur, branding.
 * Convention Next.js : remplace automatiquement l'OG de la home pour
 * les URL /blog/[slug] dans toutes les meta og:image et twitter:image.
 */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  const title = post?.title || "Article Krealabs";
  const category = post?.category || "Blog";
  const author = post?.author.name || "Krealabs";
  const date = post?.date || "";

  const [switzer600, switzer700] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/switzer/switzer-600.ttf")),
    readFile(join(process.cwd(), "public/fonts/switzer/switzer-700.ttf")),
  ]);

  const accent = "#B06CFF";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          fontFamily: "Switzer",
          color: "#FAFAFA",
          position: "relative",
        }}
      >
        {/* Grid décoratif */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            display: "flex",
          }}
        />

        {/* Halo accent */}
        <div
          style={{
            position: "absolute",
            bottom: -250,
            left: -150,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${accent}40, transparent 70%)`,
            filter: "blur(100px)",
            display: "flex",
          }}
        />

        {/* Header : wordmark + catégorie */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 9999,
                background: accent,
                boxShadow: `0 0 24px ${accent}99`,
                display: "flex",
              }}
            />
            <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em" }}>
              krealabs
            </span>
          </div>
          <div
            style={{
              padding: "10px 20px",
              borderRadius: 9999,
              background: `${accent}26`,
              color: accent,
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            {category}
          </div>
        </div>

        {/* Titre principal */}
        <div
          style={{
            fontSize: title.length > 60 ? 60 : 72,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            position: "relative",
            zIndex: 1,
            maxWidth: "100%",
            display: "flex",
          }}
        >
          <span>{title}</span>
        </div>

        {/* Footer auteur + date */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            fontWeight: 600,
            position: "relative",
            zIndex: 1,
            paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <span style={{ color: "rgba(250,250,250,0.85)" }}>{author}</span>
          <span style={{ color: "rgba(250,250,250,0.5)" }}>
            {date} · krealabs.fr
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Switzer", data: switzer600, weight: 600, style: "normal" },
        { name: "Switzer", data: switzer700, weight: 700, style: "normal" },
      ],
    },
  );
}
