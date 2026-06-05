"use client";

import { useCallback, useEffect, useState } from "react";

import { getSubjectQuestionBank } from "@/services/faculty_service";

export default function useSubjectQuestionBank(
  subjectId: number
) {
  const [data, setData] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      setError("");

      const response =
        await getSubjectQuestionBank(subjectId);

      setData(response);
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Failed to load question bank."
      );
    } finally {
      setLoading(false);
    }
  }, [subjectId]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return {
    data,

    loading,

    error,

    refresh: fetchData,
  };
}
