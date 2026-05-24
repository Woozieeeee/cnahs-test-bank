interface Props {
  severity: string;
}

export default function ActivitySeverityBadge({
  severity,
}: Props) {
  const styles = {
    INFO: "bg-blue-100 text-blue-700",

    SUCCESS: "bg-green-100 text-green-700",

    WARNING: "bg-yellow-100 text-yellow-700",

    ERROR: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${
          styles[severity as keyof typeof styles] ||
          styles.INFO
        }
      `}
    >
      {severity}
    </span>
  );
}
