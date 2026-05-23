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
    <div
      className="
        rounded-2xl
        bg-white
        p-6
        shadow-sm
      "
    >
      <p
        className="
          text-sm
          text-gray-500
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
          text-gray-400
        "
      >
        {description}
      </p>
    </div>
  );
}
