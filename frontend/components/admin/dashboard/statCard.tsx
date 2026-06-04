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
    <MotionCard className="bg-card rounded-2xl p-6 shadow-sm">
      <p className="text-muted-foreground text-sm">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-bold">{value}</h3>

      <p className="text-muted-foreground mt-1 text-sm">
        {description}
      </p>
    </MotionCard>
  );
}
