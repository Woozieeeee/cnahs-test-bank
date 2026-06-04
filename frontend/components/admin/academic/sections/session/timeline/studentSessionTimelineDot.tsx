import { memo } from "react";

interface Props {
  severityColor: string;

  isLast?: boolean;
}

function StudentSessionTimelineDot({
  severityColor,
  isLast = false,
}: Props) {
  return (
    <div className="relative flex justify-center">
      {!isLast && (
        <div className="bg-border absolute top-7 left-1/2 h-full w-px -translate-x-1/2" />
      )}

      <div className="bg-muted relative z-10 mt-5 flex h-5 w-5 items-center justify-center rounded-full">
        <div
          className={`h-2 w-2 rounded-full ${severityColor} `}
        />
      </div>
    </div>
  );
}

export default memo(StudentSessionTimelineDot);
