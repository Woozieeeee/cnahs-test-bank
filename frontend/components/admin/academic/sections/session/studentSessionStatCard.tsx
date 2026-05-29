interface Props {
  label: string;

  value: string;

  badge?: string;
}

export default function StudentSessionStatCard({
  label,
  value,
  badge,
}: Props) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-border/60
        bg-card
        p-5
        transition-all
        hover:-translate-y-0.5
        hover:shadow-sm
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-3
        "
      >
        <div>
          <p
            className="
              text-xs
              uppercase
              tracking-wide
              text-muted-foreground
            "
          >
            {label}
          </p>

          <h3
            className="
              mt-2
              text-lg
              font-semibold
              text-foreground
            "
          >
            {value}
          </h3>
        </div>

        {badge && (
          <div
            className="
              rounded-full
              bg-primary/10
              px-3
              py-1
              text-xs
              font-semibold
              text-primary
            "
          >
            {badge}
          </div>
        )}
      </div>
    </div>
  );
}
