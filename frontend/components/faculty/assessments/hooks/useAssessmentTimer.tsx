"use client";

import { useEffect, useState } from "react";

import type { Assessment } from "@/types/assessments/assessment";

export default function useAssessmentTimer(
  assessment?: Assessment
) {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    if (!assessment?.startsAt) {
      return;
    }

    const updateTimer = () => {
      const now = Date.now();

      const startTime = new Date(
        assessment.startsAt!
      ).getTime();

      const endTime =
        startTime + assessment.duration * 60 * 1000;

      const target = now < startTime ? startTime : endTime;

      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      const minutes = Math.floor(
        (diff % (1000 * 60 * 60)) / (1000 * 60)
      );

      setTimeRemaining(
        `${days}:${hours
          .toString()
          .padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`
      );
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [assessment]);

  return timeRemaining;
}
