"use client";

import NavbarTitle from "./navbarTitle";

import NavbarNotifications from "./navbarNotifications";

import NavbarDarkMode from "./navbarDarkMode";

import NavbarProfile from "./navbarProfile";

export default function Navbar() {
  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        items-center
        justify-between
        border-b
        bg-white
        px-6
        py-4
      "
    >
      {/* PAGE TITLE */}

      <NavbarTitle />

      {/* RIGHT SIDE */}

      <div
        className="
          flex
          items-center
          gap-4
        "
      >
        <NavbarDarkMode />

        <NavbarNotifications />

        <NavbarProfile />
      </div>
    </header>
  );
}
