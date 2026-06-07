"use client";

import { useEffect, useState } from "react";

import { getFacultySections } from "@/services/faculty_service";

import type { FacultySectionStats } from "@/types/faculty/facultySectionStats";

export default function useFacultySections() {
  const [sections, setSections] = useState<FacultySectionStats[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchSections = async () => {
    try {
      setLoading(true);

      setError("");

      const data = await getFacultySections();

      setSections(data);
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Failed to load sections."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  return {
    sections,
    loading,
    error,
    refresh: fetchSections,
  };
}
