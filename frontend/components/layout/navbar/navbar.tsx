"use client";

import NavbarTitle from "./navbarTitle";

import NavbarNotifications from "./navbarNotifications";

import NavbarDarkMode from "./navbarDarkMode";

import NavbarProfile from "./navbarProfile";

import NavbarMobileMenu from "./navbarMobileMenu";

interface Props {
  userName: string;
  role: string;

  onMenuClick?: () => void;
}

export default function Navbar({
  userName,
  role,
  onMenuClick,
}: Props) {
  return (
    <header className="border-border bg-background/90 sticky top-0 z-40 flex items-center justify-between border-b px-6 py-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <NavbarMobileMenu onClick={() => onMenuClick?.()} />

        <NavbarTitle />
      </div>

      <div className="flex items-center gap-4">
        <NavbarDarkMode />

        <NavbarNotifications />

        <NavbarProfile name={userName} role={role} />
      </div>
    </header>
  );
}
