"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Service {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
}

/* A miniature of each service page's own signature, in CSS. */
function Preview({ index }: { index: number }) {
  switch (index) {
    case 0: // WordPress: the post editor
      return (
        <div className="sw-mini sw-wp">
          <span className="sw-chip">Modifier l’article</span>
          <p className="sw-type">
            Nos horaires d’été<span className="sw-caret" />
          </p>
          <span className="sw-line" />
          <span className="sw-line is-short" />
          <span className="sw-btn">Publier</span>
        </div>
      );
    case 1: // Web dev: sheet becoming cards
      return (
        <div className="sw-mini sw-dev">
          <div className="sw-sheet">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className={i === 4 || i === 9 ? "is-err" : undefined} />
            ))}
          </div>
          <span className="sw-arrow">→</span>
          <div className="sw-cards">
            <span />
            <span />
            <span />
          </div>
        </div>
      );
    case 2: // Mobile: a phone with a notification
      return (
        <div className="sw-mini sw-mobile">
          <div className="sw-phone">
            <p>9:41</p>
            <span className="sw-notif">Votre commande est prête</span>
          </div>
        </div>
      );
    case 3: // Design: wireframe / final
      return (
        <div className="sw-mini sw-design">
          <div className="sw-wire">
            <span />
            <span />
            <span />
          </div>
          <div className="sw-final">
            <span />
            <span />
            <span />
          </div>
          <span className="sw-handle" />
        </div>
      );
    default: // SEO: first place
      return (
        <div className="sw-mini sw-seo">
          <span className="sw-search">fleuriste rouen</span>
          <span className="sw-res is-you">Votre site</span>
          <span className="sw-res" />
          <span className="sw-res" />
          <span className="sw-gauge">98</span>
        </div>
      );
  }
}

/**
 * Services index signature: the five needs as a large switchboard; the
 * one you point at (or focus) shows a miniature of its page beside it.
 * On phones each row carries its own miniature.
 */
export function ServiceSwitchboard({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="sw">
      <ol className="sw-list">
        {services.map((s, i) => (
          <li key={s.href}>
            <Link
              href={s.href}
              className={cn("sw-row", i === active && "is-active")}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className="sw-num">0{i + 1}</span>
              <span className="min-w-0">
                <span className="sw-eyebrow">{s.eyebrow}</span>
                <span className="sw-title">{s.title}</span>
                <span className="sw-desc">{s.description}</span>
              </span>
              <ArrowUpRight className="sw-go size-6" aria-hidden />
            </Link>
            <div className="sw-inline" aria-hidden>
              <Preview index={i} />
            </div>
          </li>
        ))}
      </ol>
      <div className="sw-stage" aria-hidden>
        <div key={active} className="sw-stage-inner">
          <Preview index={active} />
          <p className="sw-stage-label">{services[active].eyebrow}</p>
        </div>
      </div>
    </div>
  );
}
