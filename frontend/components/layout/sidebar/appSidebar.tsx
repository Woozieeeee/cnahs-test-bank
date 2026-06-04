"use client";

import SidebarHeader from "./sidebarHeader";
import SidebarNav from "./sidebarNav";
import SidebarLogoutButton from "./sidebarLogoutButton";
import SidebarToggle from "./sidebarToggle";

import { useSidebar } from "./sidebarContext";

import type { NavItem } from "./sidebarNav";

interface Props {
  title: string;

  subtitle: string;

  navItems: NavItem[];
}

export default function AppSidebar({
  title,
  subtitle,
  navItems,
}: Props) {
  const { collapsed } = useSidebar();

  return (
    <aside
      className={`border-border bg-card sticky top-0 z-100 hidden h-screen border-r transition-[width] duration-300 ease-in-out lg:block ${
        collapsed ? "w-20" : "w-64"
      } `}
    >
      <SidebarToggle />

      <div className="p-5">
        <SidebarHeader title={title} subtitle={subtitle} />

        <SidebarNav items={navItems} />

        <SidebarLogoutButton />
      </div>
    </aside>
  );
}
