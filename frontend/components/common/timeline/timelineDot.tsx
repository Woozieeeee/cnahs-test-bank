import { memo } from "react";

interface Props {
  color?: string;

  isLast?: boolean;
}

function TimelineDot({
  color = "bg-primary",
  isLast = false,
}: Props) {
  return (
    <div className="relative flex justify-center">
      {!isLast && (
        <div className="bg-border absolute top-4 h-full w-px" />
      )}

      <div
        className={`relative z-10 mt-1 h-3 w-3 rounded-full ${color} `}
      />
    </div>
  );
}

export default memo(TimelineDot);
