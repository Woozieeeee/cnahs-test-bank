"use client";

import { useState } from "react";

import MotionButton from "@/components/motion/motionButton";

import { ChevronDown } from "lucide-react";

import NavbarProfileDropdown from "./navbarProfileDropdown";

export default function NavbarProfile() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative">
      <div
        onClick={() => setShowDropdown(!showDropdown)}
        className="
          flex
          items-center
          gap-3
          rounded-xl
          px-3
          py-2
          text-foreground
          transition
          hover:bg-muted
        "
      >
        <div className="text-right">
          <p className="font-medium">Admin</p>

          <p
            className="
              text-sm
              text-muted-foreground
            "
          >
            Administrator
          </p>
        </div>

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-black
            font-semibold
            text-white
          "
        >
          A
        </div>

        <ChevronDown size={18} />
      </div>

      {showDropdown && <NavbarProfileDropdown />}
    </div>
  );
}
