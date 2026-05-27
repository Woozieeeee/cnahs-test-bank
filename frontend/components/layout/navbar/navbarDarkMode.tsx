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
        text-foreground
        transition
        hover:bg-muted
      "
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
