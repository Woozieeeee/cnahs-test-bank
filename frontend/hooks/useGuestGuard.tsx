"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import useAuth from "./useAuth";

export default function useGuestGuard() {
  const router = useRouter();

  const {
    user,

    loading,

    isAuthenticated,
  } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      // =========================
      // ROLE REDIRECTS
      // =========================

      if (user.role === "ADMIN") {
        router.replace("/admin/dashboard");
      }

      if (user.role === "FACULTY") {
        router.replace("/faculty/dashboard");
      }

      if (user.role === "STUDENT") {
        router.replace("/student/dashboard");
      }
    }
  }, [user, loading, isAuthenticated, router]);

  return {
    loading,

    isGuest: !user,
  };
}
