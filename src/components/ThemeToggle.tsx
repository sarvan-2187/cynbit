"use client";

import { Moon, Sun } from "lucide-react";

// Light is the default. The choice is remembered; the inline script in layout.tsx applies it before paint.
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    // Swap instantly instead of letting every hover transition animate the colour change.
    root.classList.add("theme-switching");
    root.dataset.theme = next;
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("theme-switching")));
    try {
      localStorage.theme = next;
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      className="grid size-10 place-items-center rounded-full border border-line text-mist transition-colors hover:text-paper"
    >
      <Moon size={17} className="dark:hidden" aria-hidden="true" />
      <Sun size={17} className="hidden dark:block" aria-hidden="true" />
    </button>
  );
}
