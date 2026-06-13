"use client";

import { useState, useEffect } from "react";
import useProtectedRoute from "@/hooks/auth/useProtectedRoute";
import { getTimeBasedGreeting } from "@/lib/greetings";

export default function FacultyDashboardHeader() {
  const { user } = useProtectedRoute(["FACULTY"]);
  const [greeting, setGreeting] = useState({ greeting: "Welcome", emoji: "👋" });

  useEffect(() => {
    if (user) {
      setGreeting(getTimeBasedGreeting(user.isFirstLogin));
    }
  }, [user]);

  // Auto-refresh greeting every minute to catch time changes
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      setGreeting(getTimeBasedGreeting(user.isFirstLogin));
    }, 60000); // Update every 60 seconds

    return () => clearInterval(interval);
  }, [user]);

  return (
    <div>
      <p className="text-muted-foreground text-sm">
        Faculty Portal
      </p>

      <h1 className="mt-1 text-3xl font-bold transition-opacity duration-300">
        <span className="inline-block">
          {greeting.greeting}! {greeting.emoji}
        </span>
      </h1>

      <p className="text-muted-foreground mt-2">
        {user?.name}, manage subjects, questions, exams, and student performance.
      </p>
    </div>
  );
}
