"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import useAuth from "./useAuth";

type Role = "ADMIN" | "FACULTY" | "STUDENT";

export default function useProtectedRoute(
  allowedRoles: Role[]
) {
  const router = useRouter();

  const {
    user,

    loading,

    isAuthenticated,
  } = useAuth();

  useEffect(() => {
    // =========================
    // STILL LOADING
    // =========================

    if (loading) return;

    // =========================
    // NOT AUTHENTICATED
    // =========================

    if (!isAuthenticated) {
      router.replace("/login");

      return;
    }

    // =========================
    // ROLE NOT ALLOWED
    // =========================

    if (user && !allowedRoles.includes(user.role)) {
      router.replace("/login");
    }
  }, [
    user,
    loading,
    isAuthenticated,
    allowedRoles,
    router,
  ]);

  return {
    user,

    loading,

    isAuthenticated,
  };
}
