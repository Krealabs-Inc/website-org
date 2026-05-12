import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "Krealabs — Agence web à Rouen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * OG image générée pour la home et toutes les pages sans override.
 * Convention Next.js : ce fichier devient automatiquement /opengraph-image
 * et est injecté dans les meta og:image.
 */
export default async function Image() {
  const [switzer600, switzer700] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/switzer/switzer-600.ttf")),
    readFile(join(process.cwd(), "public/fonts/switzer/switzer-700.ttf")),
  ]);

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
          padding: "80px",
          fontFamily: "Switzer",
          color: "#FAFAFA",
          position: "relative",
        }}
      >
        {/* Grid décoratif en fond */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            display: "flex",
          }}
        />

        {/* Halo pourpre */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -100,
            width: 600,
            height: 600,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(176,108,255,0.4), transparent 70%)",
            filter: "blur(80px)",
            display: "flex",
          }}
        />

        {/* Wordmark en haut */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 9999,
              background: "#B06CFF",
              boxShadow: "0 0 32px rgba(176,108,255,0.6)",
              display: "flex",
            }}
          />
          <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.02em" }}>
            krealabs
          </span>
        </div>

        {/* Titre central */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              marginBottom: 28,
              display: "flex",
              gap: "0.25em",
            }}
          >
            <span>Agence web à</span>
            <span style={{ color: "#B06CFF" }}>Rouen.</span>
          </div>
          <div
            style={{
              fontSize: 34,
              fontWeight: 600,
              color: "rgba(250,250,250,0.6)",
              letterSpacing: "-0.015em",
              display: "flex",
            }}
          >
            <span>Sites WordPress · Apps mobiles · Logiciels sur mesure</span>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            fontWeight: 600,
            position: "relative",
            zIndex: 1,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <span style={{ color: "rgba(250,250,250,0.7)" }}>krealabs.fr</span>
          <span
            style={{
              color: "#B06CFF",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              fontSize: 20,
            }}
          >
            WordPress · Next.js · React Native
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
