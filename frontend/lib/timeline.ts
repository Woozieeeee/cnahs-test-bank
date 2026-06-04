export function getSeverityDotColor(severity: string) {
  switch (severity) {
    case "ERROR":
      return "bg-red-500";

    case "WARNING":
      return "bg-yellow-500";

    default:
      return "bg-green-500";
  }
}

export function getTimelineBorder(
  isViolation: boolean,
  isHighSeverity: boolean
) {
  if (isViolation) {
    return "border-red-200/70";
  }

  if (isHighSeverity) {
    return "border-amber-200/70";
  }

  return "border-border/60";
}
