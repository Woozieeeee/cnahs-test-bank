"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { useSidebar } from "./sidebarContext";

export default function SidebarToggle() {
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="border-border bg-background absolute top-23 -right-5 z-9999 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm transition"
    >
      {collapsed ? (
        <ChevronRight size={14} />
      ) : (
        <ChevronLeft size={14} />
      )}
    </button>
  );
}
