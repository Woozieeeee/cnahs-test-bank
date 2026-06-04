"use client";

import Link from "next/link";

import MotionCard from "@/components/motion/motionCard";

interface Props {
  title: string;

  description: string;

  href: string;

  icon: React.ElementType;
}

export default function AcademicCard({
  title,
  description,
  href,
  icon: Icon,
}: Props) {
  return (
    <MotionCard>
      <Link
        href={href}
        className="border-border bg-card hover:border-ring block rounded-2xl border p-6 transition hover:shadow-md"
      >
        <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-xl">
          <Icon size={22} className="text-foreground" />
        </div>

        <h2 className="text-card-foreground mt-5 text-xl font-semibold">
          {title}
        </h2>

        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          {description}
        </p>
      </Link>
    </MotionCard>
  );
}
