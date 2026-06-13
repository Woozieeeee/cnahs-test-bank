import { useState, useEffect } from "react";

interface UseExamTimerProps {
  enabled: boolean;
  durationMinutes: number;
  onTimeUp: () => void;
}

export function useExamTimer({
  enabled,
  durationMinutes,
  onTimeUp,
}: UseExamTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(durationMinutes * 60);

  useEffect(() => {
    if (!enabled || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [enabled, timeLeft, onTimeUp]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours > 0 ? `${hours}h` : ""} ${minutes}m ${secs}s`.trim();
  };

  return { timeLeft, formatTime };
}
