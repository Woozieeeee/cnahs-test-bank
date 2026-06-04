"use client";

import { Menu } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function NavbarMobileMenu({
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="hover:bg-muted rounded-xl p-2 transition lg:hidden"
    >
      <Menu size={22} />
    </button>
  );
}
