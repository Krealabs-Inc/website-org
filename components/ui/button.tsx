import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Button - Krealabs studio
 *
 * Boutons capsule avec relief et flèche dans une pastille, 2 tailles (md/lg), 3 variantes
 * principales (default/secondary/ghost) + 2 spécialisées (destructive/link).
 * Les variantes `outline` et `sm` sont conservées pour la compat des call sites.
 */
const buttonVariants = cva(
  [
    "studio-button relative inline-flex items-center justify-center gap-3 whitespace-nowrap",
    "rounded-full border border-transparent font-medium tracking-[-0.01em]",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "studio-button-primary bg-[var(--accent)] text-[var(--accent-foreground)]",
          "hover:bg-[var(--accent-hover)] motion-safe:hover:-translate-y-0.5",
          "active:translate-y-px",
        ].join(" "),
        secondary: [
          "studio-button-secondary bg-[var(--surface)] text-[var(--foreground)]",
          "border border-[var(--border)]",
          "hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)]",
          "active:translate-y-px",
        ].join(" "),
        outline: [
          "studio-button-outline text-[var(--foreground)]",
          "border border-[var(--border)] bg-[var(--surface)]",
          "hover:bg-[var(--surface-hover)] hover:border-[var(--accent)]",
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
        default: "h-11 px-5 text-sm",
        md: "h-11 px-5 text-sm",
        sm: "h-10 px-4 text-sm",
        lg: "studio-button-lg h-14 px-7 text-[0.95rem]",
        xl: "studio-button-lg h-14 px-7 text-[0.95rem]",
        icon: "h-11 w-11",
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
