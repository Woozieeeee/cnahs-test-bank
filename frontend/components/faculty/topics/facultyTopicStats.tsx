"use client";

interface Props {
  totalTopics: number;

  activeTopics: number;

  totalQuestions: number;
}

export default function FacultyTopicStats({
  totalTopics,
  activeTopics,
  totalQuestions,
}: Props) {
  const stats = [
    {
      label: "Topics",
      value: totalTopics,
    },

    {
      label: "Active Topics",
      value: activeTopics,
    },

    {
      label: "Questions",
      value: totalQuestions,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="border-border bg-card rounded-2xl border p-5"
        >
          <p className="text-muted-foreground text-sm">
            {stat.label}
          </p>

          <p className="mt-2 text-3xl font-bold">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
