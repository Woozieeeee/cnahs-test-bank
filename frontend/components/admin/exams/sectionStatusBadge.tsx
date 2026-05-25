interface Props {
  active: boolean;

  hasViolations?: boolean;

  hasSuspicious?: boolean;
}

export default function SectionStatusBadge({
  active,

  hasViolations = false,

  hasSuspicious = false,
}: Props) {
  const statusStyles = hasViolations
    ? {
        badge: "bg-red-100 text-red-700",

        dot: "bg-red-500 animate-pulse",

        label: "VIOLATIONS DETECTED",
      }
    : hasSuspicious
      ? {
          badge: "bg-amber-100 text-amber-700",

          dot: "bg-amber-500 animate-pulse",

          label: "SUSPICIOUS ACTIVITY",
        }
      : active
        ? {
            badge: "bg-emerald-100 text-emerald-700",

            dot: "bg-emerald-500 animate-pulse",

            label: "LIVE EXAM",
          }
        : {
            badge: "bg-slate-100 text-slate-500",

            dot: "bg-slate-400",

            label: "NO ACTIVE EXAM",
          };

  return (
    <div
      className={`
        flex
        items-center
        gap-2
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold

        ${statusStyles.badge}
      `}
    >
      <div
        className={`
          h-2
          w-2
          rounded-full

          ${statusStyles.dot}
        `}
      />

      {statusStyles.label}
    </div>
  );
}
