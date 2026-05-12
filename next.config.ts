import type { NextConfig } from "next";

const securityHeaders = [
  // Force HTTPS pour 2 ans, includeSubDomains, preload
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Empêche MIME-sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Empêche iframe (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Referrer minimal en cross-origin
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Désactive APIs sensibles non utilisées
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
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
