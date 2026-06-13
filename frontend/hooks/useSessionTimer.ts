import { useEffect, useState, useRef, useCallback } from "react";

interface SessionTimeInfo {
  totalSeconds: number;
  hours: number;
  minutes: number;
  seconds: number;
  isVisible: boolean; // Only show in last hour
  percentage: number; // For progress indicator
}

/**
 * Hook to track JWT token expiration time
 * Shows timer only in the last hour before expiration
 * Syncs with JWT token expiration from localStorage
 */
export const useSessionTimer = (): SessionTimeInfo => {
  const [timeInfo, setTimeInfo] = useState<SessionTimeInfo>({
    totalSeconds: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isVisible: false,
    percentage: 100,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastAlertTimeRef = useRef<number>(0);

  const calculateTimeRemaining = useCallback(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      // Decode JWT payload (JWT format: header.payload.signature)
      const parts = token.split(".");
      if (parts.length !== 3) return null;

      // Decode payload (add padding if needed)
      let payload = parts[1];
      const padding = 4 - (payload.length % 4);
      if (padding && padding !== 4) {
        payload += "=".repeat(padding);
      }

      const decoded = JSON.parse(atob(payload)) as { exp: number };
      const expirationTime = decoded.exp * 1000; // Convert to milliseconds

      const now = Date.now();
      const timeUntilExpiration = Math.max(0, expirationTime - now);

      return timeUntilExpiration;
    } catch (error) {
      console.error("Failed to calculate session time:", error);
      return null;
    }
  }, []);

  const updateTimer = useCallback(() => {
    const timeUntilExpiration = calculateTimeRemaining();

    if (timeUntilExpiration === null) {
      setTimeInfo({
        totalSeconds: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isVisible: false,
        percentage: 100,
      });
      return;
    }

    const totalSeconds = Math.floor(timeUntilExpiration / 1000);

    // Only show timer in the last hour (3600 seconds)
    const SHOW_THRESHOLD = 60 * 60; // 1 hour in seconds
    const isVisible = totalSeconds <= SHOW_THRESHOLD;

    // Calculate percentage for progress indicator (0-100 in last hour)
    const percentage = Math.max(0, (totalSeconds / SHOW_THRESHOLD) * 100);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    setTimeInfo({
      totalSeconds,
      hours,
      minutes,
      seconds,
      isVisible,
      percentage,
    });

    // Optional: Console alert when entering last hour
    if (
      isVisible &&
      totalSeconds === SHOW_THRESHOLD &&
      Date.now() - lastAlertTimeRef.current > 5000
    ) {
      console.warn("⏰ Session expires in 1 hour");
      lastAlertTimeRef.current = Date.now();
    }
  }, [calculateTimeRemaining]);

  useEffect(() => {
    // Initial calculation
    updateTimer();

    // Update every second
    intervalRef.current = setInterval(updateTimer, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [updateTimer]);

  return timeInfo;
};
