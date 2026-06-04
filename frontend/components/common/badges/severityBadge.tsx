import { memo } from "react";

interface Props {
  severity: string;
}

function SeverityBadge({ severity }: Props) {
  const styles = {
    ERROR: "bg-red-100 text-red-700",
    WARNING: "bg-yellow-100 text-yellow-700",
    INFO: "bg-green-100 text-green-700",
  };

  return (
    <div
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[severity as keyof typeof styles] ??
        styles.INFO
      } `}
    >
      {severity}
    </div>
  );
}

export default memo(SeverityBadge);
