"use client";

import { useCallback, useEffect, useState } from "react";

import { getSubjects } from "@/services/academic_service";

import type { Subject } from "@/types/subject";

export default function useSubjects(tab = "ALL") {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchSubjects = useCallback(async () => {
    try {
      setLoading(true);

      setError("");

      const data = await getSubjects(tab);

      setSubjects(data.subjects ?? data);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load subjects.");
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  return {
    subjects,
    loading,
    error,
    refresh: fetchSubjects,
  };
}
