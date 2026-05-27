import MotionCard from "../../motion/motionCard";

type StatCardProps = {
  title: string;

  value: number;

  description: string;
};

export default function StatCard({
  title,
  value,
  description,
}: StatCardProps) {
  return (
    <MotionCard
      className="
        rounded-2xl
        bg-card
        p-6
        shadow-sm
      "
    >
      <p
        className="
          text-sm
          text-muted-foreground
        "
      >
        {title}
      </p>

      <h3
        className="
          mt-2
          text-3xl
          font-bold
        "
      >
        {value}
      </h3>

      <p
        className="
          mt-1
          text-sm
          text-muted-foreground
        "
      >
        {description}
      </p>
    </MotionCard>
  );
}
