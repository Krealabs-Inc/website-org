/**
 * Design Tokens — Krealabs
 *
 * Source unique de vérité pour les valeurs du design system v2.
 * Les vraies valeurs CSS vivent dans app/globals.css ; ce fichier sert
 * de référence TypeScript pour les composants qui ont besoin des constantes.
 *
 * Principes :
 * - Une seule échelle de radius (sauf pills)
 * - Une seule couleur d'accent
 * - Échelle de gris contextuelle (foreground/60, /40) plutôt que palette à 10 niveaux
 * - Pas de gradients dans le UI ; les gradients sont décoratifs uniquement
 */

export const tokens = {
  color: {
    accent: '#8F99ED',
    accentHover: '#7782E1',
    accentSubtle: 'rgba(143, 153, 237, 0.12)',
    accentRing: 'rgba(143, 153, 237, 0.4)',

    dark: {
      bg: '#0A0A0A',
      surface: '#141414',
      surfaceHover: '#1C1C1C',
      border: 'rgba(255, 255, 255, 0.08)',
      borderStrong: 'rgba(255, 255, 255, 0.16)',
      fg: '#FAFAFA',
      fgMuted: 'rgba(250, 250, 250, 0.6)',
      fgSubtle: 'rgba(250, 250, 250, 0.4)',
    },

    light: {
      bg: '#FAFAFA',
      surface: '#FFFFFF',
      surfaceHover: '#F4F4F5',
      border: 'rgba(0, 0, 0, 0.08)',
      borderStrong: 'rgba(0, 0, 0, 0.16)',
      fg: '#0A0A0A',
      fgMuted: 'rgba(10, 10, 10, 0.6)',
      fgSubtle: 'rgba(10, 10, 10, 0.4)',
    },

    semantic: {
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#EF4444',
    },
  },

  font: {
    sans: 'var(--font-geist)',
    serif: 'var(--font-instrument-serif)',
    mono: 'var(--font-geist-mono)',
  },

  radius: {
    DEFAULT: '0.625rem',
    full: '9999px',
  },

  spacing: {
    sectionY: 'clamp(4rem, 10vw, 8rem)',
    containerX: 'clamp(1rem, 4vw, 2rem)',
  },

  duration: {
    fast: '150ms',
    base: '200ms',
    slow: '400ms',
  },

  easing: {
    out: 'cubic-bezier(0.16, 1, 0.3, 1)',
    inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  },
} as const

export type Tokens = typeof tokens
