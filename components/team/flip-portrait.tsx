"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Team signature: each portrait turns over like an index card to show the
 * person's background on its back. The front stays a plain image; the
 * flip is a button, so it works with keyboard and touch alike.
 */
export function FlipPortrait({
  front,
  name,
  slug,
  bio,
  stack,
  location,
  years,
}: {
  front: ReactNode;
  name: string;
  slug: string;
  bio: string;
  stack: string[];
  location: string;
  years: string;
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className={cn("flip", flipped && "is-flipped")}>
      <div className="flip-inner">
        <div className="flip-face" inert={flipped}>
          {front}
        </div>
        <div className="flip-face flip-back" inert={!flipped}>
          <p className="text-caption">Parcours</p>
          <p className="text-body-sm mt-3">{bio}</p>
          <dl className="mt-auto space-y-3 text-body-sm">
            <div>
              <dt className="text-caption">Au quotidien</dt>
              <dd className="mt-1">{stack.join(" · ")}</dd>
            </div>
            <div>
              <dt className="text-caption">Basé à</dt>
              <dd className="mt-1">
                {location} · {years} ans d’expérience
              </dd>
            </div>
          </dl>
          <Link href={`/equipe/${slug}`} className="flip-link">
            Le profil complet
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
      <button
        type="button"
        className="flip-toggle"
        aria-pressed={flipped}
        aria-label={flipped ? `Revoir le portrait de ${name}` : `Retourner la fiche de ${name}`}
        onClick={() => setFlipped((f) => !f)}
      >
        <RotateCw className="size-4" />
      </button>
    </div>
  );
}
