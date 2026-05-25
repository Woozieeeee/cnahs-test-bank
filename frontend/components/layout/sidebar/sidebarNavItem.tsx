"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  label: string;
  nested?: boolean;
}

export default function SidebarNavItem({
  href,
  label,
  nested,
}: Props) {
  const pathname = usePathname();

  const isActive = nested
    ? pathname.startsWith(href)
    : pathname === href;
  return (
    <Link
      href={href}
      className={`
        block
        rounded-xl
        p-3
        text-sm
        font-medium
        transition

        ${
          isActive
            ? `
              bg-slate-900
              text-white
            `
            : `
              text-slate-600
              hover:bg-slate-100
            `
        }
      `}
    >
      {label}
    </Link>
  );
}
