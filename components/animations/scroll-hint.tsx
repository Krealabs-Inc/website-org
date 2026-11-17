/** "Faites défiler" cue: an accent segment travelling down a hairline. */
export function ScrollHint({ label = "Faites défiler" }: { label?: string }) {
  return (
    <p className="flex items-center gap-3 text-caption" aria-hidden>
      <span className="relative block h-8 w-px overflow-hidden bg-[var(--border-strong)]">
        <span className="scroll-hint-bar absolute inset-x-0 top-0 h-3 bg-[var(--accent)]" />
      </span>
      {label}
    </p>
  );
}
