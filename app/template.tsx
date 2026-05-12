/**
 * Template global — fade-in léger à chaque navigation.
 * Implémenté en CSS pour éviter de charger framer-motion sur toutes les pages.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-enter">{children}</div>;
}
