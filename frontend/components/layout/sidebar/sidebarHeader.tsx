"use client";

import { GraduationCap } from "lucide-react";

import { useSidebar } from "./sidebarContext";

interface Props {
  title: string;
  subtitle: string;
  forceExpanded?: boolean;
}

export default function SidebarHeader({
  title,
  subtitle,
  forceExpanded = false,
}: Props) {
  const { collapsed } = useSidebar();
  const isCollapsed = forceExpanded ? false : collapsed;

  return (
    <div
      className={`mb-8 transition-all duration-300 ${
        isCollapsed ? "flex justify-center" : ""
      }`}
    >
      {isCollapsed ? (
        <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl">
          <GraduationCap size={22} />
        </div>
      ) : (
        <div className="overflow-hidden transition-all duration-300">
          <h1 className="text-foreground text-2xl font-bold whitespace-nowrap">
            {title}
          </h1>

          <p className="text-muted-foreground mt-1 text-sm">
            {subtitle}
          </p>
        </div>
      )}
    </div>
  );
}
