"use client";

import SidebarNav from "./sidebarNav";
import { NavItem } from "./sidebarNav";

interface Props {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  forceExpanded?: boolean;
}

export default function MobileSidebar({
  open,
  onClose,
  navItems,
}: Props) {
  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
      />

      <aside className="border-border bg-card fixed top-0 left-0 z-50 h-screen w-64 border-r p-5 lg:hidden">
        <SidebarNav items={navItems} forceExpanded />
      </aside>
    </>
  );
}
