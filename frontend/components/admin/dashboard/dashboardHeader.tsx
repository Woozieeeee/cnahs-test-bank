import { useState, useEffect } from "react";
import PageHeader from "@/components/layout/pages/pageHeader";
import PageTitle from "@/components/layout/pages/pageTitle";
import useProtectedRoute from "@/hooks/auth/useProtectedRoute";
import { getTimeBasedGreeting } from "@/lib/greetings";

export default function DashboardHeader() {
  const { user } = useProtectedRoute(["ADMIN"]);
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
    <PageHeader>
      <PageTitle
        title={`${greeting.greeting}, Admin! ${greeting.emoji}`}
        description="Manage students, approvals, faculty, and examinations easily."
      />
    </PageHeader>
  );
}
