interface Props {
  total: number;

  pending: number;

  approved: number;

  rejected: number;
}

export default function UsersStatsBar({
  total,
  pending,
  approved,
  rejected,
}: Props) {
  const stats = [
    {
      label: "Total Users",

      value: total,
    },

    {
      label: "Pending",

      value: pending,
    },

    {
      label: "Approved",

      value: approved,
    },

    {
      label: "Rejected",

      value: rejected,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card hover:bg-muted/60 rounded-2xl p-6 shadow-sm transition hover:-translate-y-1"
        >
          <p className="text-muted-foreground">
            {stat.label}
          </p>

          <h2 className="text-foreground mt-2 text-3xl font-bold">
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}
