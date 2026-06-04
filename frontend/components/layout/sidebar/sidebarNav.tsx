"use client";

import SidebarNavItem from "./sidebarNavItem";

import type { LucideIcon } from "lucide-react";

export interface NavItem {
  href: string;

  label: string;

  icon: LucideIcon;

  nested?: boolean;
}

interface Props {
  items: NavItem[];

  forceExpanded?: boolean;
}

export default function SidebarNav({
  items,
  forceExpanded = false,
}: Props) {
  return (
    <nav className="space-y-2">
      {items.map((item) => (
        <SidebarNavItem
          key={item.href}
          href={item.href}
          label={item.label}
          icon={item.icon}
          nested={item.nested}
          forceExpanded={forceExpanded}
        />
      ))}
    </nav>
  );
}
