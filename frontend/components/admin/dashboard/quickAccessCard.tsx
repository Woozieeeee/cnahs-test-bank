import Link from "next/link";

import MotionCard from "../../motion/motionCard";

interface Props {
  title: string;

  description: string;

  href: string;

  icon: React.ReactNode;
}

export default function QuickAccessCard({
  title,
  description,
  href,
  icon,
}: Props) {
  return (
    <Link href={href} className="block">
      <MotionCard
        className="
          rounded-2xl
          border
          border-border
          bg-card
          p-6
          transition
          hover:border-ring
          hover:bg-muted/40
          hover:shadow-sm
        "
      >
        <div
          className="
            mb-4
            text-foreground
          "
        >
          {icon}
        </div>

        <h3
          className="
            text-lg
            font-semibold
            text-card-foreground
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-2
            text-sm
            text-muted-foreground
          "
        >
          {description}
        </p>
      </MotionCard>
    </Link>
  );
}
