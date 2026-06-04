"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { LucideIcon } from "lucide-react";

import { useSidebar } from "./sidebarContext";

interface Props {
  href: string;

  label: string;

  icon: LucideIcon;

  nested?: boolean;

  forceExpanded?: boolean;
}

export default function SidebarNavItem({
  href,
  label,
  icon: Icon,
  nested,
  forceExpanded,
}: Props) {
  const pathname = usePathname();

  const { collapsed } = useSidebar();

  const isActive = nested
    ? pathname.startsWith(href)
    : pathname === href;
  const actualCollapsed = forceExpanded ? false : collapsed;
  return (
    <div className="group relative">
      <Link
        href={href}
        className={`flex items-center rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 ${
          actualCollapsed ? "justify-center" : "gap-3"
        } ${
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        } `}
      >
        <Icon size={18} className="shrink-0" />

        <span
          className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
            actualCollapsed
              ? "max-w-0 opacity-0"
              : "max-w-[200px] opacity-100"
          } `}
        >
          {label}
        </span>
      </Link>

      {actualCollapsed && (
        <div className="border-border bg-popover pointer-events-none absolute top-1/2 left-full z-50 ml-3 -translate-y-1/2 rounded-lg border px-3 py-2 text-xs font-medium opacity-0 shadow-lg transition group-hover:opacity-100">
          {label}
        </div>
      )}
    </div>
  );
}
