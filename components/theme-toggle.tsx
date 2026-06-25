"use client";

import { SunMoon } from "lucide-react";

export function ThemeToggle() {
  function toggleTheme() {
    const current = document.documentElement.dataset.theme;
    const currentlyDark =
      current === "dark" ||
      (!current && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const nextIsDark = !currentlyDark;
    document.documentElement.dataset.theme = nextIsDark ? "dark" : "light";
    window.localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  }

  return (
    <button
      className="icon-button"
      type="button"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      onClick={toggleTheme}
    >
      <SunMoon size={18} aria-hidden="true" />
    </button>
  );
}
