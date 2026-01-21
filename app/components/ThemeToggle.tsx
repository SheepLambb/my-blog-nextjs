"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";
const KEY = "theme";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem(KEY) as Theme | null) ?? null;
    const preferDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const t: Theme = saved ?? (preferDark ? "dark" : "light");
    setTheme(t);
    applyTheme(t);
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem(KEY, next);
    applyTheme(next);
  }

  return (
    <button className="btn btn-icon" onClick={toggle} aria-label="Toggle theme">
      <span className="icon" aria-hidden>
        {mounted && theme === "dark" ? "☾" : "☀"}
      </span>
      <span className="btn-label">{mounted ? theme : ""}</span>
    </button>
  );
}
