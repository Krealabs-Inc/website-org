import * as React from "react"

import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide" | "full"
  as?: "div" | "section" | "header" | "footer" | "main" | "article"
}

const sizeMap = {
  narrow: "max-w-3xl",
  default: "max-w-7xl",
  wide: "max-w-[88rem]",
  full: "max-w-none",
} as const

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "default", as = "div", children, ...props }, ref) => {
    const Comp = as as React.ElementType
    return (
      <Comp
        ref={ref}
        className={cn(
          "w-full mx-auto px-[clamp(1rem,4vw,2rem)]",
          sizeMap[size],
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  },
)
Container.displayName = "Container"
