import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { getMember } from "@/lib/team";

export const runtime = "nodejs";
export const alt = "Profil membre de l'équipe Krealabs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * OG image dynamique pour chaque page auteur /equipe/[slug].
 * Affichée par LinkedIn / Twitter / Facebook lors des partages.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getMember(slug);
  const name = member?.name || "Équipe Krealabs";
  const role = member?.role || "Co-fondateur · Développeur";
  const initials = member?.initials || "K";

  const [switzer600, switzer700] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/switzer/switzer-600.ttf")),
    readFile(join(process.cwd(), "public/fonts/switzer/switzer-700.ttf")),
  ]);

  const accent = "#8F99ED";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
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
            top: -200,
            right: -150,
            width: 800,
            height: 800,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${accent}33, transparent 70%)`,
            filter: "blur(120px)",
            display: "flex",
          }}
        />

        {/* Container principal */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header : wordmark + breadcrumb */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
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
              <span
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
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
              Équipe
            </div>
          </div>

          {/* Profile */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 48,
            }}
          >
            {/* Avatar gros */}
            <div
              style={{
                width: 220,
                height: 220,
                borderRadius: 24,
                background: `linear-gradient(135deg, ${accent}40, ${accent}10)`,
                border: `2px solid ${accent}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 96,
                fontWeight: 700,
                color: accent,
                letterSpacing: "-0.02em",
              }}
            >
              {initials}
            </div>

            {/* Nom + role */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: 86,
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: "-0.035em",
                  display: "flex",
                }}
              >
                {name}
              </div>
              <div
                style={{
                  marginTop: 18,
                  fontSize: 32,
                  fontWeight: 600,
                  color: accent,
                  letterSpacing: "-0.01em",
                  display: "flex",
                }}
              >
                {role}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 22,
              fontWeight: 600,
              paddingTop: 20,
              borderTop: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <span style={{ color: "rgba(250,250,250,0.85)" }}>
              Krealabs · Agence digitale Rouen
            </span>
            <span style={{ color: "rgba(250,250,250,0.5)" }}>
              krealabs.fr/equipe/{slug}
            </span>
          </div>
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
