"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { TeamMember } from "@/lib/team";
import { rich } from "@/components/ui/rich";

/**
 * Team page signature: four tall portraits side by side fill the screen; the one you
 * point at, focus or tap widens and tells its story while the others
 * narrow to a strip with their name. A band of facts sits above.
 */
export function TeamWall({ members, title, band }: { members: TeamMember[]; title: string; band: { value: string; label: string }[] }) {
  const [active, setActive] = useState(0);
  return (
    <section className="mur">
      <div className="mur-head">
        <h1 className="mur-title">{rich(title)}</h1>
        <ul className="mur-band">
          {band.map((b) => (
            <li key={b.label}>
              <strong>{b.value}</strong> {b.label}
            </li>
          ))}
        </ul>
      </div>

      <ul className="mur-wall">
        {members.map((m, i) => {
          const on = i === active;
          const first = m.name.split(" ")[0];
          return (
            <li key={m.slug} className={cn("mur-panel", on && "is-on")}>
              <button
                type="button"
                className="mur-hit"
                aria-expanded={on}
                aria-label={`${m.name}, ${m.role}`}
                onClick={() => setActive(i)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                onFocus={() => setActive(i)}
              />
              <div className="mur-photo">
                {m.photo ? <Image src={m.photo} alt="" fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" /> : null}
              </div>
              <span className="mur-strip" aria-hidden>
                {first}
              </span>
              <div className="mur-story" aria-hidden={!on}>
                <p className="mur-role">{m.role}</p>
                <h2 className="mur-name">{m.name}</h2>
                <p className="mur-before">{m.background}.</p>
                <p className="mur-quote">« {m.loves} »</p>
                <p className="mur-stack">{m.specialties.join(" · ")}</p>
                <Link href={`/equipe/${m.slug}`} className="mur-link" tabIndex={on ? 0 : -1}>
                  Son profil
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
