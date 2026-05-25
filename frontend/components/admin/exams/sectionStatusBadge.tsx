interface Props {
  active: boolean;
}

export default function SectionStatusBadge({
  active,
}: Props) {
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

        ${
          active
            ? `
              bg-red-100
              text-red-700
            `
            : `
              bg-slate-100
              text-slate-500
            `
        }
      `}
    >
      <div
        className={`
          h-2
          w-2
          rounded-full

          ${
            active
              ? "bg-red-500 animate-pulse"
              : "bg-slate-400"
          }
        `}
      />

      {active ? "LIVE EXAM" : "NO ACTIVE EXAM"}
    </div>
  );
}
