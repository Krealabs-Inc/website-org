"use client";

import { useState } from "react";
import { Share2, Check, Link as LinkIcon, Twitter, Linkedin } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

interface ShareButtonProps {
  url: string;
  title: string;
  description?: string;
}

/**
 * Bouton partage avec Web Share API (mobile) ou menu déroulant
 * (LinkedIn, Twitter, Copy link) en fallback desktop.
 */
export function ShareButton({ url, title, description }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: description, url });
      } catch (err: unknown) {
        // User cancelled — no-op
        if (err instanceof Error && err.name !== "AbortError") {
          toast.error("Partage impossible");
        }
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Lien copié");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Copie impossible");
    }
  };

  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-2">
      {/* Mobile : Web Share API natif */}
      <button
        type="button"
        onClick={handleNativeShare}
        className={cn(
          "md:hidden inline-flex items-center gap-2 px-4 h-10 rounded-[var(--radius)]",
          "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]",
          "hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)] transition-colors text-body-sm font-medium",
        )}
      >
        <Share2 className="size-4" />
        Partager
      </button>

      {/* Desktop : boutons individuels */}
      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur X (Twitter)"
        className="hidden md:inline-flex size-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)] items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
      >
        <Twitter className="size-4" />
      </a>
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur LinkedIn"
        className="hidden md:inline-flex size-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)] items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
      >
        <Linkedin className="size-4" />
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copier le lien"
        className="hidden md:inline-flex size-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)] items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
      >
        {copied ? <Check className="size-4 text-[var(--success)]" /> : <LinkIcon className="size-4" />}
      </button>
    </div>
  );
}
