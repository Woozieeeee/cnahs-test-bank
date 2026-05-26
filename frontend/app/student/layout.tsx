"use client";

import useProtectedRoute from "@/hooks/useProtectedRoute";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useProtectedRoute(["STUDENT"]);

  if (loading) {
    return null;
  }

  return <>{children}</>;
}
