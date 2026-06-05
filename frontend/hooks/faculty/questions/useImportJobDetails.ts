"use client";

import { useCallback, useEffect, useState } from "react";

import { getImportJobDetails } from "@/services/faculty_service";

import { ImportJobDetails } from "@/types/imports/importJobDetails";

export default function useImportJobDetails(
  jobId: number | null
) {
  const [details, setDetails] =
    useState<ImportJobDetails | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const fetchDetails = useCallback(async () => {
    if (!jobId) return;

    try {
      setLoading(true);

      setError("");

      const data = await getImportJobDetails(jobId);

      setDetails(data);
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Failed to load import details."
      );
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    void fetchDetails();
  }, [fetchDetails]);

  return {
    details,
    loading,
    error,
    refresh: fetchDetails,
  };
}
