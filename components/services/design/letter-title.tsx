import { Fragment, type CSSProperties } from "react";

const GRID = 24;

// Deterministic, so the offsets are stable between renders.
function rand(i: number) {
  const x = Math.sin(i * 78.233 + 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Design hero title: each letter starts somewhere on the site's grid and
 * snaps into place, like elements aligning in a design file.
 *
 * Pure CSS (globals.css, "letter-snap"): the animation runs from the first
 * paint, so the headline never waits for JavaScript, and reduced motion
 * shows it still. The h1 keeps its plain text for assistive tech.
 */
export function LetterTitle({ lines }: { lines: { text: string; accent?: boolean }[] }) {
  const label = lines.map((l) => l.text).join(" ");
  let index = 0;

  return (
    <h1 className="text-display" aria-label={label}>
      {lines.map((line, li) => (
        <span key={li} className={`block ${line.accent ? "text-[var(--accent)]" : ""}`} aria-hidden>
          {line.text.split(" ").map((word, wi) => (
            <Fragment key={wi}>
              {/* A real space between words, so the title can wrap. */}
              {wi > 0 && " "}
              <span className="inline-block whitespace-nowrap">
                {[...word].map((ch) => {
                  const i = index++;
                  const style = {
                    "--dx": `${Math.round((rand(i) - 0.5) * 8) * GRID}px`,
                    "--dy": `${Math.round((rand(i + 31) - 0.5) * 8) * GRID}px`,
                    "--delay": `${100 + i * 14}ms`,
                  } as CSSProperties;
                  return (
                    <span key={i} className="letter-snap" style={style}>
                      {line.accent ? <em>{ch}</em> : ch}
                    </span>
                  );
                })}
              </span>
            </Fragment>
          ))}
        </span>
      ))}
    </h1>
  );
}
