import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)]",
  {
    variants: {
      variant: {
        default:
          "border-[var(--accent-subtle)] bg-[var(--accent-subtle)] text-[var(--accent)]",
        secondary:
          "border-[var(--border)] bg-[var(--surface)] text-[var(--muted-foreground)]",
        outline:
          "border-[var(--border-strong)] bg-transparent text-[var(--foreground)]",
        destructive:
          "border-transparent bg-[var(--danger)] text-white",
        success:
          "border-transparent bg-[var(--success)]/15 text-[var(--success)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
