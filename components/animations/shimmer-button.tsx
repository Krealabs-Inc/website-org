"use client";

import { forwardRef } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

interface ShimmerButtonProps extends Omit<ButtonProps, "size"> {
  /** Kept for compatibility; emphasis now comes from the button relief. */
  duration?: number;
  size?: "md" | "lg";
}

export const ShimmerButton = forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  ({ duration, size = "lg", ...props }, ref) => {
    void duration;
    return <Button ref={ref} size={size} {...props} />;
  },
);
ShimmerButton.displayName = "ShimmerButton";
