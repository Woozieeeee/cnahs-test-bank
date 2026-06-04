import { memo } from "react";

interface Props {
  severity?: "LOW" | "MEDIUM" | "HIGH";
}

function ViolationSeverityBadge({
  severity = "HIGH",
}: Props) {
  const styles = {
    LOW: `
      bg-green-100
      text-green-700
    `,
    MEDIUM: `
      bg-yellow-100
      text-yellow-700
    `,
    HIGH: `
      bg-red-100
      text-red-700
    `,
  };

  return (
    <div
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[severity]} `}
    >
      {severity}
    </div>
  );
}

export default memo(ViolationSeverityBadge);
