interface Props {
  severityColor: string;

  isLast?: boolean;
}

export default function StudentSessionTimelineDot({
  severityColor,
  isLast = false,
}: Props) {
  return (
    <div className="relative flex justify-center">
      {!isLast && (
        <div
          className="
            absolute
            left-1/2
            top-7
            h-full
            w-px
            -translate-x-1/2
            bg-slate-200
          "
        />
      )}

      <div
        className="
          relative
          z-10
          mt-5
          flex
          h-5
          w-5
          items-center
          justify-center
          rounded-full
          bg-sky-50
        "
      >
        <div
          className={`h-2 w-2 rounded-full ${severityColor}`}
        />
      </div>
    </div>
  );
}
