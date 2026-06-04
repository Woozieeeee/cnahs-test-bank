"use client";

import { useState } from "react";

import { ChevronDown } from "lucide-react";

import NavbarProfileDropdown from "./navbarProfileDropdown";

interface Props {
  name: string;

  role: string;
}

export default function NavbarProfile({
  name,
  role,
}: Props) {
  const [showDropdown, setShowDropdown] = useState(false);

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative">
      <div
        onClick={() => setShowDropdown(!showDropdown)}
        className="text-foreground hover:bg-muted flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition"
      >
        <div className="text-right">
          <p className="font-medium">{name}</p>

          <p className="text-muted-foreground text-sm">
            {role}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black font-semibold text-white">
          {initials}
        </div>

        <ChevronDown size={18} />
      </div>

      {showDropdown && <NavbarProfileDropdown />}
    </div>
  );
}
