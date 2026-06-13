"use client";

import NavbarTitle from "./navbarTitle";

import NavbarNotifications from "./navbarNotifications";

import NavbarDarkMode from "./navbarDarkMode";

import NavbarProfile from "./navbarProfile";

import NavbarMobileMenu from "./navbarMobileMenu";

import NavbarSessionTimer from "./navbarSessionTimer";

import type { UserRole } from "@/lib/userSettings";

interface Props {
  userName: string;
  userRole: UserRole;
  hasAvatar?: boolean;
  avatarVersion?: string | Date;
  mobileMenuOpen?: boolean;
  onMenuClick?: () => void;
}

export default function Navbar({
  userName,
  userRole,
  hasAvatar,
  avatarVersion,
  mobileMenuOpen = false,
  onMenuClick,
}: Props) {
  return (
    <header className="border-border bg-background/90 sticky top-0 z-40 flex items-center justify-between gap-2 border-b px-3 py-3 backdrop-blur sm:px-5 sm:py-4 lg:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <NavbarMobileMenu
          isOpen={mobileMenuOpen}
          onClick={() => onMenuClick?.()}
        />

        <NavbarTitle />
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3 lg:gap-4">
        <NavbarSessionTimer />

        <NavbarDarkMode />

        <NavbarNotifications />

        <NavbarProfile
          name={userName}
          userRole={userRole}
          hasAvatar={hasAvatar}
          avatarVersion={avatarVersion}
        />
      </div>
    </header>
  );
}
