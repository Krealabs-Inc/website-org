"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Galet, GALET_TEAM_COLORS } from "@/components/team/galet";
import { cn } from "@/lib/utils";

interface Member {
  slug: string;
  name: string;
  role: string;
  initials: string;
  photo?: string;
  loves: string;
}

/**
 * Team page signature: the four partners as Galets, the characters of
 * our videos. Touching one makes it hop and reveals the real person:
 * photo, role, what they love, link to their profile. Each can be turned
 * back.
 */
export function GaletTeam({ members }: { members: Member[] }) {
  const [shown, setShown] = useState<Set<string>>(new Set());
  const toggle = (slug: string) =>
    setShown((s) => {
      const next = new Set(s);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });

  return (
    <ul className="gteam">
      {members.map((m, i) => {
        const on = shown.has(m.slug);
        const first = m.name.split(" ")[0];
        return (
          <li key={m.slug} className={cn("gteam-item", on && "is-on")} style={{ "--i": i } as React.CSSProperties}>
            <button type="button" className="gteam-stage" aria-pressed={on} aria-label={on ? `Revoir ${first} en galet` : `Découvrir ${m.name}`} onClick={() => toggle(m.slug)}>
              <span className="gteam-galet">
                <Galet color={GALET_TEAM_COLORS[i % GALET_TEAM_COLORS.length]} glasses={m.slug.startsWith("thibaud")} />
              </span>
              <span className="gteam-photo">
                {m.photo ? (
                  <Image src={m.photo} alt={on ? `Portrait de ${m.name}` : ""} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                ) : (
                  <span className="team-portrait-initials">{m.initials}</span>
                )}
              </span>
            </button>
            <p className="gteam-name">{on ? m.name : first}</p>
            <p className="gteam-role">{m.role}</p>
            <div className="gteam-more" aria-hidden={!on}>
              <p className="gteam-quote">« {m.loves} »</p>
              <Link href={`/equipe/${m.slug}`} tabIndex={on ? 0 : -1} className="gteam-link">
                Son profil
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
