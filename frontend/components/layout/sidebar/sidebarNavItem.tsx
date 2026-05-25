"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

interface Props {
  href: string;

  label: string;
}

export default function SidebarNavItem({
  href,
  label,
}: Props) {
  const pathname = usePathname();

  const active = pathname === href;

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
          active
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
