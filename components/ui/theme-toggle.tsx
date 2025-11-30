"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = theme === "dark" ? "light" : "dark";

    // Get click position
    const rect = buttonRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-overlay';
    overlay.style.setProperty('--x', `${(x / window.innerWidth) * 100}%`);
    overlay.style.setProperty('--y', `${(y / window.innerHeight) * 100}%`);
    overlay.style.setProperty('--overlay-color', newTheme === 'dark' ? '#030303' : '#ffffff');
    overlay.style.setProperty('--size', '0%');

    document.body.appendChild(overlay);

    // Trigger animation
    requestAnimationFrame(() => {
      overlay.classList.add('active');
    });

    // Change theme after a short delay
    setTimeout(() => {
      setTheme(newTheme);
    }, 150);

    // Remove overlay
    setTimeout(() => {
      overlay.remove();
    }, 700);
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.1] dark:bg-white/[0.05] dark:border-white/[0.1]" />
    );
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleThemeChange}
      className={cn(
        "relative w-9 h-9 rounded-lg",
        "bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-white/[0.15]",
        "dark:bg-white/[0.05] dark:hover:bg-white/[0.1] dark:border-white/[0.1] dark:hover:border-white/[0.15]",
        "transition-all duration-200",
        "flex items-center justify-center"
      )}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-white/60 hover:text-white/80 transition-colors" />
      ) : (
        <Moon className="w-4 h-4 text-gray-600 hover:text-gray-900 transition-colors" />
      )}
    </button>
  );
}
