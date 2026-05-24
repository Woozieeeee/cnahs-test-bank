"use client";

import { useState } from "react";

import { Moon, Sun } from "lucide-react";

export default function NavbarDarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="
        rounded-full
        p-2
        transition
        hover:bg-gray-100
      "
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
