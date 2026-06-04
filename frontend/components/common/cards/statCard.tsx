import { memo } from "react";

interface Props {
  label: string;

  value: string | number;

  compact?: boolean;

  className?: string;

  valueClassName?: string;
}

function StatCard({
  label,
  value,
  compact = false,
  className = "",
  valueClassName = "",
}: Props) {
  return (
    <div
      className={`border-border bg-card rounded-xl border ${
        compact ? `p-3 text-center` : `p-5`
      } ${className} `}
    >
      <p
        className={`text-muted-foreground ${compact ? "text-xs" : "text-sm"} `}
      >
        {label}
      </p>

      <p
        className={`text-foreground ${
          compact
            ? `mt-1 font-semibold`
            : `mt-2 text-2xl font-bold`
        } ${valueClassName} `}
      >
        {value}
      </p>
    </div>
  );
}

export default memo(StatCard);
