import { useEffect, useState } from "react";
import { getStudentDashboard, StudentDashboardData } from "@/services/student_dashboard_service";

interface StatusDataItem {
  name: string;
  value: number;
  fill: string;
}

interface TierBreakdownItem {
  name: string;
  completed: number;
  inProgress: number;
}

interface UseDashboardDataReturn {
  dashboardData: StudentDashboardData | null;
  isLoading: boolean;
  error: string | null;
  statusData: StatusDataItem[];
  tierBreakdown: TierBreakdownItem[];
}

export function useDashboardData(): UseDashboardDataReturn {
  const [dashboardData, setDashboardData] = useState<StudentDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setIsLoading(true);
        const data = await getStudentDashboard();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch dashboard:", err);
        setError("Unable to load dashboard. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // Calculate status data for pie chart
  const statusData: StatusDataItem[] = dashboardData
    ? [
        { name: "Completed", value: dashboardData.stats.completedSubjects, fill: "#22c55e" },
        { name: "Active", value: dashboardData.stats.activeSubjects, fill: "#3b82f6" },
        {
          name: "Remaining",
          value: Math.max(
            0,
            dashboardData.stats.totalSubjects -
              dashboardData.stats.completedSubjects -
              dashboardData.stats.activeSubjects
          ),
          fill: "#f3f4f6",
        },
      ].filter((item) => item.value > 0)
    : [];

  // Calculate tier breakdown for bar chart
  const tierBreakdown: TierBreakdownItem[] = dashboardData
    ? [
        {
          name: "Easy",
          completed: dashboardData.subjects.filter((s) => s.easyPassed).length,
          inProgress: dashboardData.subjects.filter(
            (s) => !s.easyPassed && s.status === "IN_PROGRESS"
          ).length,
        },
        {
          name: "Medium",
          completed: dashboardData.subjects.filter((s) => s.mediumPassed).length,
          inProgress: dashboardData.subjects.filter(
            (s) => !s.mediumPassed && s.status === "IN_PROGRESS"
          ).length,
        },
        {
          name: "Hard",
          completed: dashboardData.subjects.filter((s) => s.hardPassed).length,
          inProgress: dashboardData.subjects.filter(
            (s) => !s.hardPassed && s.status === "IN_PROGRESS"
          ).length,
        },
        {
          name: "Expert",
          completed: dashboardData.subjects.filter((s) => s.expertPassed).length,
          inProgress: dashboardData.subjects.filter(
            (s) => !s.expertPassed && s.status === "IN_PROGRESS"
          ).length,
        },
      ]
    : [];

  return {
    dashboardData,
    isLoading,
    error,
    statusData,
    tierBreakdown,
  };
}
