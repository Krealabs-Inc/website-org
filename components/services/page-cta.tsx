import { ServiceCta } from "@/components/services/service-cta";
import { rich } from "@/components/ui/rich";

type CtaTexts = { ctaEyebrow: string; ctaTitle: string; ctaText: string; ctaPrimary: string; ctaSecondary: string };

/** ServiceCta fed from a page's editable texts (see ctaFields). */
export function PageCta({ t }: { t: CtaTexts }) {
  return (
    <ServiceCta
      eyebrow={t.ctaEyebrow}
      title={rich(t.ctaTitle)}
      description={t.ctaText}
      primaryLabel={t.ctaPrimary}
      secondaryLabel={t.ctaSecondary || null}
    />
  );
}
