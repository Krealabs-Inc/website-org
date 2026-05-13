import type { NextConfig } from "next";

// CSP report-only : observe les violations sans rien casser. À durcir
// progressivement après quelques semaines d'observation des reports.
// Permet : Vercel Analytics, Resend API, polices Google, Unsplash images.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vercel.live",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://api.resend.com https://va.vercel-scripts.com https://vitals.vercel-insights.com https://vercel.live wss:",
  "frame-src 'self' https://vercel.live",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // Force HTTPS pour 2 ans, includeSubDomains, preload
  // Pour la liste preload : soumettre sur https://hstspreload.org après mise en prod
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Empêche MIME-sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Empêche iframe (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Referrer minimal en cross-origin
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Désactive APIs sensibles non utilisées
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  // CSP en mode report-only : aucun blocage, juste signal Google + visibilité
  // sur les violations. À promouvoir en Content-Security-Policy quand stable.
  { key: "Content-Security-Policy-Report-Only", value: csp },
  // Cross-Origin Opener Policy : isole les BrowsingContext (anti-spectre)
  // same-origin-allow-popups conserve les popups d'auth tiers (Stripe, Google).
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 jours
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'me7aitdbxq.ufs.sh',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.vercel.com',
      },
      {
        protocol: 'https',
        hostname: 'github.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'a.slack-edge.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  async redirects() {
    return [
      // Anciennes URLs e-commerce → /contact (SEO conservation)
      { source: '/pricing', destination: '/contact?type=devis', permanent: true },
      { source: '/cart', destination: '/contact', permanent: true },
      { source: '/checkout', destination: '/contact', permanent: true },
      { source: '/checkout/:path*', destination: '/contact', permanent: true },
      { source: '/products', destination: '/services', permanent: true },
      { source: '/products/:slug', destination: '/services', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Headers de sécurité appliqués à toutes les routes
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Cache long pour les fonts (1 an, immutable)
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
