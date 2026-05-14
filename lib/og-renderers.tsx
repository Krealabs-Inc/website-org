/**
 * Helpers de rendu OG images Krealabs (utilisés par app/.../opengraph-image.tsx).
 * Style cohérent avec /blog/[slug] et /equipe/[slug] : Switzer + accent #8F99ED
 * + halo radial + grid décoratif.
 */

import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

import { CITIES } from "@/lib/cities";
import { SECTORS } from "@/lib/sectors";
import { COMPARATORS } from "@/lib/comparators";
import { GLOSSARY } from "@/lib/glossary";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const ACCENT = "#8F99ED";
const BG = "#0A0A0A";
const FG = "#FAFAFA";

async function loadFonts() {
  const [switzer600, switzer700] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/switzer/switzer-600.ttf")),
    readFile(join(process.cwd(), "public/fonts/switzer/switzer-700.ttf")),
  ]);
  return [
    { name: "Switzer", data: switzer600, weight: 600 as const, style: "normal" as const },
    { name: "Switzer", data: switzer700, weight: 700 as const, style: "normal" as const },
  ];
}

function Shell({
  badge,
  children,
  footer,
}: {
  badge: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: BG,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "72px",
        fontFamily: "Switzer",
        color: FG,
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
          background: `radial-gradient(circle, ${ACCENT}40, transparent 70%)`,
          filter: "blur(100px)",
          display: "flex",
        }}
      />

      {/* Header : wordmark + badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
          marginBottom: "auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: ACCENT,
              boxShadow: `0 0 24px ${ACCENT}99`,
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
            background: `${ACCENT}26`,
            color: ACCENT,
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          {badge}
        </div>
      </div>

      {/* Body */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column" }}>
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div
          style={{
            position: "relative",
            zIndex: 1,
            paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,0.12)",
            fontSize: 22,
            fontWeight: 600,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "rgba(250,250,250,0.6)",
            marginTop: "40px",
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Renderers spécifiques par route
// =============================================================================

export async function renderCityOg(slug: string): Promise<ImageResponse> {
  const city = CITIES[slug];
  if (!city) {
    return renderFallbackOg("Agence web Krealabs");
  }

  const title = `Agence web ${city.cityArticle}`;

  return new ImageResponse(
    Shell({
      badge: city.region,
      children: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 90,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              display: "flex",
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              fontWeight: 600,
              color: ACCENT,
              letterSpacing: "-0.01em",
              display: "flex",
            }}
          >
            {city.name} {city.postalCode} · {city.department}
          </div>
        </div>
      ),
      footer: (
        <>
          <span>Krealabs · Studio digital</span>
          <span>krealabs.fr{city.path}</span>
        </>
      ),
    }),
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}

export async function renderSectorOg(slug: string): Promise<ImageResponse> {
  const sector = SECTORS[slug];
  if (!sector) {
    return renderFallbackOg("Agence web Rouen");
  }

  return new ImageResponse(
    Shell({
      badge: "Spécialité secteur",
      children: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "rgba(250,250,250,0.6)",
              marginBottom: 14,
              display: "flex",
            }}
          >
            Agence web pour
          </div>
          <div
            style={{
              fontSize: 86,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              display: "flex",
              color: ACCENT,
            }}
          >
            {sector.namePlural}
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 30,
              fontWeight: 600,
              display: "flex",
            }}
          >
            à Rouen et en Normandie
          </div>
        </div>
      ),
      footer: (
        <>
          <span>Krealabs · Programmatic SEO</span>
          <span>krealabs.fr/agence-web-rouen/{slug}</span>
        </>
      ),
    }),
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}

export async function renderComparatorOg(slug: string): Promise<ImageResponse> {
  const c = COMPARATORS[slug];
  if (!c) return renderFallbackOg("Comparateurs Krealabs");

  return new ImageResponse(
    Shell({
      badge: "Comparateur",
      children: (
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <div
            style={{
              flex: 1,
              padding: "32px 36px",
              borderRadius: 24,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: "-0.025em" }}>
              {c.a.name}
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 20,
                fontWeight: 600,
                color: "rgba(250,250,250,0.6)",
                display: "flex",
              }}
            >
              {c.a.tagline}
            </div>
          </div>

          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: ACCENT,
              fontStyle: "italic",
              display: "flex",
            }}
          >
            vs
          </div>

          <div
            style={{
              flex: 1,
              padding: "32px 36px",
              borderRadius: 24,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: "-0.025em" }}>
              {c.b.name}
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 20,
                fontWeight: 600,
                color: "rgba(250,250,250,0.6)",
                display: "flex",
              }}
            >
              {c.b.tagline}
            </div>
          </div>
        </div>
      ),
      footer: (
        <>
          <span>Krealabs · Choix techniques</span>
          <span>krealabs.fr/comparateur/{slug}</span>
        </>
      ),
    }),
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}

export async function renderLexiqueOg(slug: string): Promise<ImageResponse> {
  const entry = GLOSSARY[slug];
  if (!entry) return renderFallbackOg("Lexique du web");

  return new ImageResponse(
    Shell({
      badge: entry.category,
      children: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "rgba(250,250,250,0.6)",
              marginBottom: 18,
              display: "flex",
            }}
          >
            Lexique du web · Définition
          </div>
          <div
            style={{
              fontSize: entry.term.length > 30 ? 64 : 86,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              display: "flex",
              color: ACCENT,
            }}
          >
            {entry.term}
          </div>
        </div>
      ),
      footer: (
        <>
          <span>Krealabs · krealabs.fr/lexique</span>
          <span>{`/${slug}`}</span>
        </>
      ),
    }),
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}

export async function renderCalculatorOg(): Promise<ImageResponse> {
  return new ImageResponse(
    Shell({
      badge: "Calculateur",
      children: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: "rgba(250,250,250,0.6)",
              marginBottom: 18,
              display: "flex",
            }}
          >
            Combien coûte votre projet web ?
          </div>
          <div
            style={{
              fontSize: 90,
              fontWeight: 700,
              lineHeight: 0.98,
              letterSpacing: "-0.04em",
              display: "flex",
            }}
          >
            Estimation
            <br />
            en 60 <span style={{ color: ACCENT }}>secondes</span>
          </div>
        </div>
      ),
      footer: (
        <>
          <span>Krealabs · Fourchette indicative basée sur le marché normand 2026</span>
          <span>krealabs.fr/calculateur</span>
        </>
      ),
    }),
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}

async function renderFallbackOg(label: string): Promise<ImageResponse> {
  return new ImageResponse(
    Shell({
      badge: "Krealabs",
      children: (
        <div style={{ fontSize: 86, fontWeight: 700, display: "flex" }}>
          {label}
        </div>
      ),
    }),
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}
