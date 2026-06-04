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
      <MotionCard className="border-border bg-card hover:border-ring hover:bg-muted/40 rounded-2xl border p-6 transition hover:shadow-sm">
        <div className="text-foreground mb-4">{icon}</div>

        <h3 className="text-card-foreground text-lg font-semibold">
          {title}
        </h3>

        <p className="text-muted-foreground mt-2 text-sm">
          {description}
        </p>
      </MotionCard>
    </Link>
  );
}
