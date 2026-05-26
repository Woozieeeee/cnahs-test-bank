"use client";

import useProtectedRoute from "@/hooks/useProtectedRoute";

export default function FacultyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useProtectedRoute(["FACULTY"]);

  if (loading) {
    return null;
  }

  return <>{children}</>;
}
