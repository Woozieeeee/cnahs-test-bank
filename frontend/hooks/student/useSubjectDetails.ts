import { useCallback, useEffect, useState } from "react";
import {
  getSubjectDetails,
  SubjectDetailsData,
} from "@/services/student_subject_details_service";

export function useSubjectDetails(
  subjectIdOrSlug: number | string,
  isAuthenticated: boolean,
  authLoading: boolean
) {
  const [subjectData, setSubjectData] = useState<SubjectDetailsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch subject details
  const fetchDetails = useCallback(async () => {
    if (!isAuthenticated || authLoading) return;

    try {
      // Only show loading on initial load, not on silent refresh
      if (!subjectData) {
        setIsLoading(true);
      }
      
      const data = await getSubjectDetails(subjectIdOrSlug);
      setSubjectData(data);
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch subject details:", err);
      const errorMessage =
        err?.response?.data?.message ||
        "Unable to load subject details. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [subjectIdOrSlug, isAuthenticated, authLoading, subjectData]);

  // Initial fetch
  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  // Silent auto-refresh every 30 seconds (no loading state)
  useEffect(() => {
    if (!isAuthenticated || authLoading) return;

    const interval = setInterval(() => {
      fetchDetails();
    }, 30000);

    return () => clearInterval(interval);
  }, [isAuthenticated, authLoading, fetchDetails]);

  // Manual refresh handler (also silent)
  const handleManualRefresh = async () => {
    await fetchDetails();
  };

  return {
    subjectData,
    isLoading,
    error,
    isRefreshing,
    handleManualRefresh,
  };
}
