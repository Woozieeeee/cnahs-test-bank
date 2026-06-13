"use client";

import { useEffect, useState, memo } from "react";
import { useRouter } from "next/navigation";
import useProtectedRoute from "@/hooks/auth/useProtectedRoute";
import { getStudentDashboard, StudentDashboardData } from "@/services/student_dashboard_service";
import SubjectCard from "@/components/student/SubjectCard";
import EmptyState from "@/components/common/states/emptyState";
import PageContainer from "@/components/layout/pages/pageContainer";
import PageHeader from "@/components/layout/pages/pageHeader";
import PageTitle from "@/components/layout/pages/pageTitle";
import { Card } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react";

function StudentSubjectsPageComponent() {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useProtectedRoute(["STUDENT"]);

  const [dashboardData, setDashboardData] = useState<StudentDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || loading) return;

    const fetchDashboard = async () => {
      try {
        setIsLoading(true);
        const data = await getStudentDashboard();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch dashboard:", err);
        setError("Unable to load subjects. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, [isAuthenticated, loading]);

  if (loading || !isAuthenticated) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      </PageContainer>
    );
  }

  if (isLoading) {
    return (
      <PageContainer>
        <PageHeader>
          <PageTitle title="Your Subjects" description="Loading your enrolled subjects..." />
        </PageHeader>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      </PageContainer>
    );
  }

  if (error || !dashboardData) {
    return (
      <PageContainer>
        <PageHeader>
          <PageTitle title="Your Subjects" description="View all your enrolled subjects" />
        </PageHeader>
        <div className="mt-8">
          <Card className="border-red-200 bg-red-50 p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-red-600" size={24} />
              <div>
                <h3 className="font-semibold text-red-900">
                  Failed to Load Subjects
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  {error || "An unexpected error occurred."}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </PageContainer>
    );
  }

  const { subjects } = dashboardData;

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle
          title="Your Subjects"
          description={`Welcome back, ${user?.name}! Track your progress across all your enrolled subjects.`}
        />
      </PageHeader>

      {/* Subject Cards */}
      <div className="mt-12">
        {subjects.length === 0 ? (
          <EmptyState
            title="No subjects enrolled yet"
            description="Contact your instructor to get enrolled in subjects."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}

const StudentSubjectsPage = memo(StudentSubjectsPageComponent);
export default StudentSubjectsPage;
