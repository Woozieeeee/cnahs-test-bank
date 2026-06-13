"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function useTokenExpiration() {
  const router = useRouter();
  const expirationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const cleanupTimeout = () => {
      if (expirationTimeoutRef.current) {
        clearTimeout(expirationTimeoutRef.current);
      }
    };

    const getTokenExpiration = (): number | null => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return null;

        // Decode JWT payload (JWT format: header.payload.signature)
        const parts = token.split(".");
        if (parts.length !== 3) return null;

        // Decode payload (add padding if needed)
        const payload = parts[1];
        const padded = payload + "=".repeat((4 - (payload.length % 4)) % 4);
        const decoded = JSON.parse(atob(padded));

        if (!decoded.exp) return null;

        // exp is in seconds, convert to milliseconds
        return decoded.exp * 1000;
      } catch (error) {
        console.error("Failed to parse token expiration:", error);
        return null;
      }
    };

    const scheduleTokenCheck = () => {
      cleanupTimeout();

      const expirationTime = getTokenExpiration();
      if (!expirationTime) return;

      const now = Date.now();
      const timeUntilExpiration = expirationTime - now;

      // If token already expired, logout immediately
      if (timeUntilExpiration <= 0) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      // Schedule logout at token expiration time
      expirationTimeoutRef.current = setTimeout(() => {
        localStorage.removeItem("token");
        router.push("/login");
      }, timeUntilExpiration);
    };

    // Initial check
    scheduleTokenCheck();

    // Re-check periodically (every 5 minutes) in case token changes
    const intervalId = setInterval(scheduleTokenCheck, 5 * 60 * 1000);

    return () => {
      cleanupTimeout();
      clearInterval(intervalId);
    };
  }, [router]);
}
