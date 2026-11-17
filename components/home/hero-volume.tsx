"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ScrollHint } from "@/components/animations/scroll-hint";

// three.js only loads in the browser, after the text is on screen.
const HeroVolumeScene = dynamic(() => import("./hero-volume-scene"), { ssr: false });

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const SUB =
  "Un site qui vous amène des demandes, une application que vos clients gardent, un outil qui remplace vos tableurs. Vous gardez la main sur votre projet, de la première idée à la mise en ligne.";

function HeroActions({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="lg" asChild>
          <Link href="/contact">
            Parler de mon projet
            <ArrowRight />
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="#realisations">Voir les réalisations</Link>
        </Button>
      </div>
      <p className="mt-6 text-caption">
        On vous répond sous 24h · Votre devis est gratuit · À Rouen et partout en France
      </p>
    </div>
  );
}

/**
 * Home hero. A real-time glass object is the centrepiece: scrolling turns
 * it and carries it across the screen while the promise hands over to the
 * call to action. Reduced motion gets one still composition, no pinning.
 */
export function HeroVolume() {
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const [mountScene, setMountScene] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const firstOpacity = useTransform(scrollYProgress, [0, 0.28, 0.42], [1, 1, 0]);
  const firstY = useTransform(scrollYProgress, [0.28, 0.42], [0, -48]);
  const secondOpacity = useTransform(scrollYProgress, [0.5, 0.66], [0, 1]);
  const secondY = useTransform(scrollYProgress, [0.5, 0.66], [40, 0]);
  const secondPointer = useTransform(secondOpacity, (o) => (o > 0.6 ? "auto" : "none"));
  const secondVisibility = useTransform(secondOpacity, (o) => (o > 0 ? "visible" : "hidden"));
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Compiling the glass shader blocks the main thread for a moment: wait
  // until the browser is idle so the text is readable and clickable first.
  useEffect(() => {
    const start = () => setMountScene(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 300);
    return () => window.clearTimeout(id);
  }, []);

  // Stop rendering the scene once the hero is off screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, ease: EASE_OUT, delay },
        };

  const scene = (
    <motion.div
      className="absolute inset-0"
      initial={false}
      animate={{ opacity: sceneReady ? 1 : 0 }}
      transition={{ duration: reduced ? 0 : 0.6, ease: EASE_OUT }}
    >
      {mountScene && (
        <HeroVolumeScene progress={scrollYProgress} reduced={reduced} active={active} onReady={() => setSceneReady(true)} />
      )}
    </motion.div>
  );

  const headline = (
    <h1 className="text-display">
      <motion.span className="block" {...enter(0.05)}>Votre activité mérite</motion.span>
      <motion.span className="block" {...enter(0.11)}>un site qui</motion.span>
      <motion.span className="block text-[var(--accent)]" {...enter(0.17)}>
        <em>travaille pour vous.</em>
      </motion.span>
    </h1>
  );

  const eyebrow = <Eyebrow dot className="mb-8">Agence web à Rouen · Sites, apps et logiciels sur mesure</Eyebrow>;

  if (reduced) {
    return (
      <section ref={sectionRef} className="relative min-h-screen overflow-hidden pt-32 pb-24">
        {scene}
        <Container className="relative">
          <div className="max-w-2xl">
            {eyebrow}
            {headline}
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8">{SUB}</p>
            <HeroActions className="mt-10" />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-grid bg-grid-fade opacity-40" />
        {scene}

        <Container className="relative flex h-full items-center">
          <motion.div className="max-w-2xl pt-16" style={{ opacity: firstOpacity, y: firstY }}>
            <motion.div {...enter(0)}>{eyebrow}</motion.div>
            {headline}
          </motion.div>

          <motion.div
            className="absolute inset-x-[clamp(1rem,4vw,2rem)] top-1/2 -translate-y-1/2 ml-auto max-w-xl lg:left-auto lg:right-[clamp(1rem,4vw,2rem)]"
            // Hidden until it fades in, so its links are not tabbable while invisible.
            style={{ opacity: secondOpacity, y: secondY, pointerEvents: secondPointer, visibility: secondVisibility }}
          >
            <p className="text-h2">
              Vous gardez la main, <em className="display-serif">on s’occupe du reste.</em>
            </p>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-6">{SUB}</p>
            <HeroActions className="mt-10" />
          </motion.div>
        </Container>

        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2" style={{ opacity: hintOpacity }}>
          <ScrollHint />
        </motion.div>
      </div>
    </section>
  );
}
