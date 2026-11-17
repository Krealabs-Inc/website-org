"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface AmbientVideoProps {
  /** MP4 in /public/videos, rendered from ../krealabs-videos (Remotion). */
  src: string;
  poster: string;
  /** Accessible name of the video. */
  label: string;
  /** What the video says, for screen readers: the videos carry text. */
  transcript: string;
  className?: string;
}

/**
 * A muted, looping brand video that only plays while it is on screen.
 * - preload="none": only the poster loads until the video is reached.
 * - Paused off screen, so it never decodes for nothing.
 * - Reduced motion: no autoplay, the poster shows with controls so the
 *   visitor can choose to play it.
 */
export function AmbientVideo({ src, poster, label, transcript, className }: AmbientVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <figure className={cn("ambient-video", className)}>
      <video
        ref={ref}
        muted
        playsInline
        loop
        preload="none"
        poster={poster}
        controls={reduced}
        aria-label={label}
      >
        <source src={src} type="video/mp4" />
      </video>
      <figcaption className="sr-only">{transcript}</figcaption>
    </figure>
  );
}
