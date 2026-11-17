"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ScrollHint } from "@/components/animations/scroll-hint";

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

function Intro() {
  return (
    <>
      <Eyebrow className="mb-6">Ce que vous obtenez</Eyebrow>
      <h2 className="text-h1">
        Un besoin précis ?
        <br />
        Une réponse <em className="display-serif">sur mesure</em>.
      </h2>
      <p className="text-body text-[var(--muted-foreground)] mt-6 max-w-md">
        Vous nous décrivez le problème, on vous propose le format qui le règle.
      </p>
      <Link href="/services" className="home-text-link mt-8">
        Voir toutes les solutions <ArrowRight className="size-4" aria-hidden />
      </Link>
    </>
  );
}

/**
 * The promises as a horizontal strip: the section pins and vertical scroll
 * drives the track. Panels lean with scroll speed and settle flat when the
 * visitor stops, so the tilt reads as feedback, not decoration.
 */
export function PromisesStrip({ promises }: { promises: ClientPromise[] }) {
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setTravel(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduced]);

  const { scrollYProgress, scrollY } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (p) => -p * travel);
  const lean = useSpring(useTransform(useVelocity(scrollY), [-2500, 0, 2500], [9, 0, -9], { clamp: true }), {
    stiffness: 260,
    damping: 32,
  });
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  if (reduced) {
    return (
      <section className="section-y border-t border-[var(--border-strong)]">
        <Container>
          <div className="max-w-2xl">
            <Intro />
          </div>
          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {promises.map((p, i) => (
              <PromiseCard key={p.href + i} promise={p} index={i} total={promises.length} />
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-[var(--border-strong)]"
      style={{ height: `calc(100vh + ${travel}px)` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />

        <motion.div
          ref={trackRef}
          className="relative flex h-full w-max items-center gap-6 pr-[8vw]"
          style={{ x, perspective: "1200px" }}
        >
          <div className="flex h-full w-[min(100vw,44rem)] shrink-0 items-center">
            <Container className="pt-16">
              <Intro />
            </Container>
          </div>

          {promises.map((p, i) => (
            <motion.div
              key={p.href + i}
              className="h-[min(62vh,500px)] w-[min(500px,82vw)] shrink-0"
              style={{ rotateY: lean, transformOrigin: "50% 50%" }}
            >
              <PromiseCard promise={p} index={i} total={promises.length} />
            </motion.div>
          ))}

          <div className="flex h-[min(62vh,500px)] w-[min(460px,82vw)] shrink-0 flex-col justify-center pl-8">
            <p className="text-caption mb-4">Et maintenant</p>
            <p className="text-h1">
              Et votre <em className="display-serif">projet ?</em>
            </p>
            <Link href="/contact" className="home-text-link mt-8">
              Parler de mon projet
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--border-strong)]">
          <motion.div className="h-full origin-left bg-[var(--accent)]" style={{ scaleX: scrollYProgress }} />
        </div>
        <motion.div className="absolute bottom-10 right-[clamp(1rem,4vw,2rem)]" style={{ opacity: hintOpacity }}>
          <ScrollHint label="Faites défiler, ça avance à l’horizontale" />
        </motion.div>
      </div>
    </section>
  );
}
