"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "next-themes";

export default function NavbarDarkMode() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        rounded-full
        p-2
        transition
        hover:bg-slate-100
        dark:hover:bg-slate-800
      "
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
