"use client";

import { useEffect, useState } from "react";

import { getFacultyDashboard } from "@/services/faculty_service";

import { FacultyDashboard } from "@/types/faculty/facultyDashboard";

export default function useFacultyDashboard() {
  const [dashboard, setDashboard] =
    useState<FacultyDashboard | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const data = await getFacultyDashboard();

      setDashboard(data);
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    dashboard,
    loading,
    error,
    refresh: fetchDashboard,
  };
}
