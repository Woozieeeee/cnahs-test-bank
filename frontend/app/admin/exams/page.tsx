"use client";

import { useState, memo } from "react";

import MotionPage from "@/components/motion/motionPage";
import PageContainer from "@/components/layout/pages/pageContainer";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";
import EmptyState from "@/components/common/states/emptyState";

import ExamMonitoringTabs from "@/components/faculty/exams/monitoring/examMonitoringTabs";
import ExamMonitoringFilters from "@/components/faculty/exams/monitoring/examMonitoringFilters";
import AdminExamMonitoringCard from "@/components/admin/exams/monitoring/examMonitoringCard";

import { useAdminExams } from "@/hooks/admin/exams/useAdminExams";

function AdminExamsPage() {
  const {
    loading,
    error,
    refresh,
    data: exams,
  } = useAdminExams({
    pollInterval: 5000,
    autoRefresh: true,
  });

  const [activeTab, setActiveTab] = useState<
    "ALL" | "SCHEDULED" | "ONGOING" | "COMPLETED"
  >("ALL");
  const [filters, setFilters] = useState({
    search: "",
    riskLevel: [] as string[],
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(
      tab as "ALL" | "SCHEDULED" | "ONGOING" | "COMPLETED"
    );
  };

  // Calculate dynamic status for each exam based on time
  const examsWithDynamicStatus = exams.map((exam) => {
    if (!exam.startsAt) return exam;

    const now = new Date().getTime();
    const startTime = new Date(exam.startsAt).getTime();
    const endTime = exam.endsAt
      ? new Date(exam.endsAt).getTime()
      : startTime + exam.duration * 60 * 1000;

    let dynamicStatus = exam.status;
    if (now < startTime) {
      dynamicStatus = "SCHEDULED";
    } else if (now < endTime) {
      dynamicStatus = "ONGOING";
    } else {
      dynamicStatus = "COMPLETED";
    }

    return { ...exam, status: dynamicStatus };
  });

  const filteredExams = examsWithDynamicStatus.filter(
    (exam) => {
      // Filter out ARCHIVED, CANCELLED, and DRAFT for Phase 1
      if (
        ["ARCHIVED", "CANCELLED", "DRAFT"].includes(
          exam.status
        )
      )
        return false;
      if (activeTab !== "ALL" && exam.status !== activeTab)
        return false;
      if (
        filters.search &&
        !exam.title
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      )
        return false;
      return true;
    }
  );

  if (loading && exams.length === 0) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading exams..."
          description="Please wait while we retrieve exam data."
        />
      </PageContainer>
    );
  }

  if (error && exams.length === 0) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load exams."
          description={error}
          onRetry={refresh}
        />
      </PageContainer>
    );
  }

  return (
    <MotionPage>
      <PageContainer>
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Live Exam Monitoring
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor all examinations and student activity.
          </p>
        </div>

        <ExamMonitoringTabs
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          exams={examsWithDynamicStatus}
        />

        <ExamMonitoringFilters
          filters={filters}
          setFilters={setFilters}
          exams={exams}
        />

        {filteredExams.length === 0 ? (
          <EmptyState
            title="No exams found"
            description={
              exams.length === 0
                ? "There are no exams yet."
                : "No exams match your filters."
            }
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredExams.map((exam) => (
              <AdminExamMonitoringCard
                key={exam.id}
                exam={exam}
              />
            ))}
          </div>
        )}
      </PageContainer>
    </MotionPage>
  );
}

export default memo(AdminExamsPage);
