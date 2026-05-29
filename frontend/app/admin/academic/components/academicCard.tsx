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
        className="
          block
          rounded-2xl
          border
          border-border
          bg-card
          p-6
          transition
          hover:border-ring
          hover:shadow-md
        "
      >
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-muted
          "
        >
          <Icon size={22} className="text-foreground" />
        </div>

        <h2
          className="
            mt-5
            text-xl
            font-semibold
            text-card-foreground
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-2
            text-sm
            leading-relaxed
            text-muted-foreground
          "
        >
          {description}
        </p>
      </Link>
    </MotionCard>
  );
}
