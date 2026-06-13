"use client";

import { memo, useMemo } from "react";
import { Clock } from "lucide-react";
import { useSessionTimer } from "@/hooks/useSessionTimer";

/**
 * NavbarSessionTimer Component
 * Displays session expiration countdown in the navbar
 * Only visible during the last hour before token expiration (12-hour total)
 *
 * Shows as: "Session expires in: HH:MM:SS"
 * Color changes based on time remaining:
 * - Green (>30min): Normal
 * - Yellow (10-30min): Warning
 * - Red (<10min): Critical
 */
function NavbarSessionTimer() {
  const { hours, minutes, seconds, isVisible, totalSeconds } = useSessionTimer();

  // Determine color based on time remaining
  const timeColor = useMemo(() => {
    if (!isVisible) return "text-muted-foreground";

    const minutes_remaining = Math.floor(totalSeconds / 60);

    if (minutes_remaining >= 30) {
      return "text-emerald-600 dark:text-emerald-400";
    } else if (minutes_remaining >= 10) {
      return "text-amber-600 dark:text-amber-400";
    } else {
      return "text-destructive";
    }
  }, [isVisible, totalSeconds]);

  // Format time with leading zeros
  const formatTime = (value: number) => String(value).padStart(2, "0");

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium ${timeColor}`}
      title="Session expiration countdown"
    >
      <Clock className="h-4 w-4" />
      <span className="hidden sm:inline">Session expires in:</span>
      <span className="font-mono">
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </span>
    </div>
  );
}

export default memo(NavbarSessionTimer);
