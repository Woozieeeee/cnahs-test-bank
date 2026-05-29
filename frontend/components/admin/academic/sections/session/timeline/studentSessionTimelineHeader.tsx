interface Props {
  title: string;

  severity: string;
}

export default function StudentSessionTimelineHeader({
  title,
  severity,
}: Props) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-3
      "
    >
      {/* TITLE */}

      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-primary
            text-xs
            font-bold
            text-primary-foreground
          "
        >
          !
        </div>

        <h4
          className="
            font-semibold
            text-foreground
          "
        >
          {title}
        </h4>
      </div>

      {/* SEVERITY */}

      <div
        className={`
          rounded-full
          px-3
          py-1
          text-xs
          font-semibold

          ${
            severity === "ERROR"
              ? "bg-red-100 text-red-700"
              : severity === "WARNING"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
          }
        `}
      >
        {severity}
      </div>
    </div>
  );
}
