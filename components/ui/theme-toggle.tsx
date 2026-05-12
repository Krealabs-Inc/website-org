"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = () => {
    const current = resolvedTheme || theme;
    const newTheme = current === "dark" ? "light" : "dark";

    const rect = buttonRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    const overlay = document.createElement("div");
    overlay.className = "theme-transition-overlay";
    overlay.style.setProperty("--x", `${(x / window.innerWidth) * 100}%`);
    overlay.style.setProperty("--y", `${(y / window.innerHeight) * 100}%`);
    overlay.style.setProperty(
      "--overlay-color",
      newTheme === "dark" ? "#0a0a0a" : "#fafafa",
    );
    overlay.style.setProperty("--size", "0%");

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add("active"));
    setTimeout(() => setTheme(newTheme), 150);
    setTimeout(() => overlay.remove(), 700);
  };

  if (!mounted) {
    return (
      <div className="size-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)]" />
    );
  }

  const isDark = (resolvedTheme || theme) === "dark";

  return (
    <button
      ref={buttonRef}
      onClick={handleThemeChange}
      className={cn(
        "relative size-10 rounded-[var(--radius)]",
        "border border-[var(--border)] bg-[var(--surface)]",
        "hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)]",
        "transition-colors duration-200",
        "flex items-center justify-center",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
      )}
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
    >
      {isDark ? (
        <Sun className="size-4 text-[var(--muted-foreground)]" />
      ) : (
        <Moon className="size-4 text-[var(--muted-foreground)]" />
      )}
    </button>
  );
}
