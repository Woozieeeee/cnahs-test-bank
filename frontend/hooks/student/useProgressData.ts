import { useEffect, useState, useMemo } from "react";
import { getStudentProgress, ProgressOverview } from "@/services/student_progress_service";

interface UseProgressDataReturn {
  progressData: ProgressOverview | null;
  isLoading: boolean;
  error: string | null;
  sortedSubjects: any[];
  tierStatsByDifficulty: any[];
}

export function useProgressData(): UseProgressDataReturn {
  const [progressData, setProgressData] = useState<ProgressOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setIsLoading(true);
        const data = await getStudentProgress();
        setProgressData(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch progress:", err);
        setError("Unable to load progress data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, []);

  // Sort subjects by progress descending
  const sortedSubjects = useMemo(() => {
    if (!progressData) return [];
    return [...progressData.subjects].sort((a, b) => b.progress - a.progress);
  }, [progressData]);

  // Transform tier stats for better display
  const tierStatsByDifficulty = useMemo(() => {
    if (!progressData) return [];
    return progressData.tierStats.map((tier) => ({
      ...tier,
      passRate: tier.completed > 0 ? Math.round((tier.completed / (tier.completed + tier.inProgress + tier.locked)) * 100) : 0,
    }));
  }, [progressData]);

  return {
    progressData,
    isLoading,
    error,
    sortedSubjects,
    tierStatsByDifficulty,
  };
}
