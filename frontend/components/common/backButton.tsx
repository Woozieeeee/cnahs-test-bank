"use client";

import Link from "next/link";

import { ArrowLeft } from "lucide-react";

interface Props {
  href?: string;

  label?: string;

  className?: string;
}

export default function BackButton({
  href = "/admin/academic",

  label = "Back to Academic Management",

  className = "",
}: Props) {
  return (
    <Link
      href={href}
      className={`text-muted-foreground hover:bg-muted hover:text-foreground inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${className} `}
    >
      <ArrowLeft size={16} />

      {label}
    </Link>
  );
}
