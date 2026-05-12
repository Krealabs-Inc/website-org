import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Button — Krealabs DS v2
 *
 * Cohérence stricte : radius unique (0.625rem), 2 tailles (md/lg), 3 variantes
 * principales (default/secondary/ghost) + 2 spécialisées (destructive/link).
 * Les variantes `outline` et `sm` sont conservées pour la compat des call sites.
 */
const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-[var(--radius)] font-semibold tracking-[-0.01em]",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--accent)] text-[var(--accent-foreground)]",
          "hover:bg-[var(--accent-hover)]",
          "active:translate-y-px",
        ].join(" "),
        secondary: [
          "bg-[var(--surface)] text-[var(--foreground)]",
          "border border-[var(--border)]",
          "hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)]",
          "active:translate-y-px",
        ].join(" "),
        outline: [
          "bg-transparent text-[var(--foreground)]",
          "border border-[var(--border-strong)]",
          "hover:bg-[var(--surface)] hover:border-[var(--accent)]",
          "active:translate-y-px",
        ].join(" "),
        ghost: [
          "bg-transparent text-[var(--foreground)]",
          "hover:bg-[var(--surface)]",
        ].join(" "),
        destructive: [
          "bg-[var(--danger)] text-white",
          "hover:bg-[var(--danger)]/90",
          "active:translate-y-px",
        ].join(" "),
        link: [
          "h-auto p-0 text-[var(--accent)] underline-offset-4",
          "hover:underline",
        ].join(" "),
      },
      size: {
        default: "h-10 px-5 text-sm",
        md: "h-10 px-5 text-sm",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-6 text-[0.95rem]",
        xl: "h-12 px-6 text-[0.95rem]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
