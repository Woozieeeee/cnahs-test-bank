"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "next-themes";

import useMounted from "@/hooks/shared/useMounted";

export default function NavbarDarkMode() {
  const { theme, setTheme } = useTheme();

  const mounted = useMounted();

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="text-foreground hover:bg-muted rounded-full p-2 transition"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
