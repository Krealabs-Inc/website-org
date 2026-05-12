import * as React from "react"

import { cn } from "@/lib/utils"

interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Numéro ou compteur affiché avant le label (ex: "01") */
  number?: string
  /** Couleur du dot — pas affiché si false */
  dot?: boolean
}

/**
 * Eyebrow — petite étiquette mono uppercase au-dessus d'un h2/h3.
 * Pattern signature : "01 / SERVICES" ou "● AGENCE ROUEN".
 */
export const Eyebrow = React.forwardRef<HTMLSpanElement, EyebrowProps>(
  ({ className, children, number, dot = false, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("text-eyebrow inline-flex items-center gap-2", className)}
        {...props}
      >
        {dot && (
          <span className="inline-block size-1.5 rounded-full bg-[var(--accent)]" />
        )}
        {number && (
          <>
            <span className="text-[var(--subtle-foreground)]">{number}</span>
            <span aria-hidden className="text-[var(--subtle-foreground)]">
              /
            </span>
          </>
        )}
        <span>{children}</span>
      </span>
    )
  },
)
Eyebrow.displayName = "Eyebrow"
