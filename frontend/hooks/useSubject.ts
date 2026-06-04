"use client";

import { useEffect, useState } from "react";

import { getSubjectById } from "@/services/academic_service";

export default function useSubject(subjectId: number) {
  const [subject, setSubject] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchSubject = async () => {
    try {
      setLoading(true);

      const data = await getSubjectById(subjectId);

      setSubject(data);

      setError(null);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Failed to fetch subject"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!subjectId) return;

    fetchSubject();
  }, [subjectId]);

  return {
    subject,
    loading,
    error,
    refresh: fetchSubject,
  };
}
