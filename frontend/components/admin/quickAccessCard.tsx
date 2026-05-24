import MotionCard from "../motion/motionCard";

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
    <MotionCard
      className="
        rounded-2xl
        bg-white
        p-6
        shadow-sm
        transition
        hover:-translate-y-1
        hover:bg-gray-50
      "
    >
      <div className="mb-4 text-black">{icon}</div>

      <h3
        className="
          text-lg
          font-semibold
          text-gray-800
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2
          text-sm
          text-gray-500
        "
      >
        {description}
      </p>
    </MotionCard>
  );
}
