"use client";

import { useState } from "react";

import { ChevronDown } from "lucide-react";

import NavbarProfileDropdown from "./navbarProfileDropdown";

export default function NavbarProfile() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="
          flex
          items-center
          gap-3
          rounded-xl
          px-3
          py-2
          transition
          hover:bg-gray-100
        "
      >
        <div className="text-right">
          <p className="font-medium">Admin</p>

          <p
            className="
              text-sm
              text-gray-500
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
      </button>

      {showDropdown && <NavbarProfileDropdown />}
    </div>
  );
}
