import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { HorizontalStrip } from "@/components/patterns/horizontal-strip";
import { rich } from "@/components/ui/rich";

export interface ClientPromise {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
}

function PromiseCard({ promise, index, total }: { promise: ClientPromise; index: number; total: number }) {
  return (
    <Link href={promise.href} className="promise-card group">
      <div className="flex items-center justify-between">
        <span className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--muted-foreground)]">
          0{index + 1} / 0{total}
        </span>
        <ArrowUpRight className="size-5 text-[var(--muted-foreground)] transition-colors group-hover:text-[var(--accent)]" aria-hidden />
      </div>
      <div>
        <p className="text-caption mb-4">{promise.eyebrow}</p>
        <h3 className="text-h2">{promise.title}</h3>
        <p className="text-body text-[var(--muted-foreground)] mt-5 max-w-md">{promise.description}</p>
      </div>
    </Link>
  );
}

/** Home: the five promises as a horizontal strip. */
export function PromisesStrip({ promises, intro }: { promises: ClientPromise[]; intro: { eyebrow: string; title: string; text: string; link: string } }) {
  return (
    <HorizontalStrip
      intro={
        <>
          <Eyebrow className="mb-6">{intro.eyebrow}</Eyebrow>
          <h2 className="text-h1">{rich(intro.title, "display-serif")}</h2>
          <p className="text-body text-[var(--muted-foreground)] mt-6 max-w-md">{intro.text}</p>
          <Link href="/services" className="home-text-link mt-8">
            {intro.link} <ArrowRight className="size-4" aria-hidden />
          </Link>
        </>
      }
      end={
        <>
          <p className="text-caption mb-4">Et maintenant</p>
          <p className="text-h1">
            Et votre <em className="display-serif">projet ?</em>
          </p>
          <Link href="/contact" className="home-text-link mt-8">
            Parler de mon projet
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </>
      }
    >
      {promises.map((p, i) => (
        <PromiseCard key={p.href + i} promise={p} index={i} total={promises.length} />
      ))}
    </HorizontalStrip>
  );
}
