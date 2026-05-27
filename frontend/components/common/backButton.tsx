"use client";

import Link from "next/link";

import { ArrowLeft } from "lucide-react";

interface Props {
  href?: string;

  label?: string;
}

export default function BackButton({
  href = "/admin/academic",

  label = "Back to Academic Management page",
}: Props) {
  return (
    <Link
      href={href}
      className="
        inline-flex
        items-center
        gap-2
        rounded-lg
        px-3
        py-2
        text-sm
        font-medium
        text-muted-foreground
        transition
        hover:bg-muted
        hover:text-foreground
      "
    >
      <ArrowLeft size={16} />

      {label}
    </Link>
  );
}
