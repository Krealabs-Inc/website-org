"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

// Fictional posts a business would publish on its own site.
const POSTS = ["Nos horaires d’été", "La terrasse est ouverte", "Fermeture exceptionnelle lundi"];

const TICK = 55; // ms per typed character
const HOLD_AFTER_TYPING = 10; // ticks before the body lines appear
const PUBLISH_AT = 30; // ticks after typing ends
const RESET_AT = 70;

/**
 * A WordPress-like editor that writes and publishes a post on its own,
 * looping through a few titles: "you edit your site yourself", shown.
 * Pauses off screen; reduced motion shows one finished post.
 */
export function EditorDemo() {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  // One state for both, so advancing to the next post stays a pure update.
  const [{ post, tick }, setState] = useState({ post: 0, tick: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const title = POSTS[post];
  const typedEnd = title.length;

  useEffect(() => {
    if (reduced || !visible) return;
    const id = window.setInterval(() => {
      setState((s) =>
        s.tick >= POSTS[s.post].length + RESET_AT
          ? { post: (s.post + 1) % POSTS.length, tick: 0 }
          : { post: s.post, tick: s.tick + 1 },
      );
    }, TICK);
    return () => window.clearInterval(id);
  }, [reduced, visible]);

  const t = reduced ? typedEnd + PUBLISH_AT + 1 : tick;
  const typed = title.slice(0, Math.min(t, typedEnd));
  const typing = t < typedEnd;
  const bodyLines = Math.max(0, Math.min(3, Math.floor((t - typedEnd - HOLD_AFTER_TYPING) / 4) + 1));
  const published = t >= typedEnd + PUBLISH_AT;

  return (
    <div ref={ref} className="wp-editor" aria-hidden>
      <div className="wp-editor-bar">
        <span className="flex gap-1.5">
          {[0, 1, 2].map((d) => (
            <span key={d} className="size-2.5 rounded-full bg-[var(--border-strong)]" />
          ))}
        </span>
        <span className="text-caption">Modifier l’article</span>
        <span className={`wp-editor-publish ${published ? "is-done" : ""}`}>{published ? "Publié ✓" : "Publier"}</span>
      </div>
      <div className="wp-editor-body">
        <span className="text-caption">Titre</span>
        <p className="wp-editor-title">
          {typed}
          <span className={`wp-editor-caret ${typing ? "is-typing" : ""}`} />
        </p>
        <div className="mt-6 space-y-3">
          {[92, 78, 60].map((w, i) => (
            <span key={w} className="wp-editor-line" style={{ width: `${w}%`, opacity: i < bodyLines ? 1 : 0 }} />
          ))}
        </div>
        <div className="wp-editor-media">
          <span className="text-caption">Image à la une</span>
        </div>
      </div>
      <p className={`wp-editor-toast ${published ? "is-shown" : ""}`}>En ligne sur votre site, sans nous appeler.</p>
    </div>
  );
}
