"use client";

import { useState, memo, use, useMemo } from "react";
import Link from "next/link";

import MotionPage from "@/components/motion/motionPage";
import PageContainer from "@/components/layout/pages/pageContainer";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";

import ExamDetailsHeader from "@/components/faculty/exams/details/examDetailsHeader";
import ExamStatisticsCards from "@/components/faculty/exams/details/examStatisticsCards";
import StudentMonitoringTable from "@/components/faculty/exams/details/studentMonitoringTable";
import ActivityTimeline from "@/components/faculty/exams/details/activityTimeline";
import ExamOverviewCard from "@/components/faculty/exams/details/examOverviewCard";
import ExamMonitoringToolbar from "@/components/faculty/exams/details/examMonitoringToolbar";

import { useAdminExamDetails } from "@/hooks/admin/exams/useAdminExamDetails";
import { useAdminExamMonitoringActions } from "@/hooks/admin/exams/useAdminExamMonitoringActions";
import { ArrowLeft } from "lucide-react";

interface AdminExamDetailPageProps {
  params: Promise<{
    examId: string;
  }>;
}

function AdminExamDetailPage({ params }: AdminExamDetailPageProps) {
  const resolvedParams = use(params);
  const examId = parseInt(resolvedParams.examId);

  const { loading, error, data: exam, refresh } = useAdminExamDetails(examId, { 
    pollInterval: 5000, 
    autoRefresh: true 
  });

  const [activeStudentTab, setActiveStudentTab] = useState<"ALL" | "ACTIVE" | "COMPLETED" | "FLAGGED">("ALL");

  const {
    actingStudentId,
    isEndingExam,
    isAnnouncing,
    handleFlagStudent,
    handleUnlockStudent,
    handleNotifyStudent,
    handleEndExam,
    handleSendAnnouncement,
  } = useAdminExamMonitoringActions({ examId, onSuccess: refresh });

  // Calculate dynamic status based on current time
  const examWithDynamicStatus = useMemo(() => {
    if (!exam || !exam.startsAt) return exam;

    const now = new Date().getTime();
    const startTime = new Date(exam.startsAt).getTime();
    const endTime = exam.endsAt ? new Date(exam.endsAt).getTime() : startTime + exam.duration * 60 * 1000;

    let dynamicStatus = exam.status;
    if (now < startTime) {
      dynamicStatus = "SCHEDULED";
    } else if (now < endTime) {
      dynamicStatus = "ONGOING";
    } else {
      dynamicStatus = "COMPLETED";
    }

    return { ...exam, status: dynamicStatus };
  }, [exam]);

  if (loading) {
    return (
      <PageContainer>
        <LoadingState title="Loading exam details..." description="Please wait while we retrieve exam monitoring data." />
      </PageContainer>
    );
  }

  if (error || !examWithDynamicStatus) {
    return (
      <PageContainer>
        <ErrorState 
          title="Failed to load exam details." 
          description={error || "The exam could not be found."} 
          onRetry={refresh} 
        />
      </PageContainer>
    );
  }

  return (
    <MotionPage>
      <PageContainer>
        {/* Back Button */}
        <Link
          href="/admin/exams"
          className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Monitoring
        </Link>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <ExamDetailsHeader exam={examWithDynamicStatus} />
          <ExamMonitoringToolbar
            examStatus={examWithDynamicStatus.status}
            activeStudents={examWithDynamicStatus.activeStudents ?? 0}
            isEndingExam={isEndingExam}
            isAnnouncing={isAnnouncing}
            onEndExam={handleEndExam}
            onSendAnnouncement={handleSendAnnouncement}
          />
        </div>

        {/* Statistics Cards */}
        <div className="mb-8">
          <ExamStatisticsCards exam={examWithDynamicStatus} />
        </div>

        {/* Overview Card */}
        <div className="mb-8">
          <ExamOverviewCard exam={examWithDynamicStatus} />
        </div>

        {/* Student Monitoring Section */}
        <div className="mb-8">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Student Monitoring</h3>
              <div className="flex gap-2">
                {["ALL", "ACTIVE", "COMPLETED", "FLAGGED"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveStudentTab(tab as "ALL" | "ACTIVE" | "COMPLETED" | "FLAGGED")}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      activeStudentTab === tab
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <StudentMonitoringTable
              exam={examWithDynamicStatus}
              filterTab={activeStudentTab}
              actingStudentId={actingStudentId}
              onFlagStudent={handleFlagStudent}
              onUnlockStudent={handleUnlockStudent}
              onNotifyStudent={handleNotifyStudent}
            />
          </div>
        </div>

        {/* Activity Timeline */}
        <div>
          <ActivityTimeline exam={examWithDynamicStatus} />
        </div>
      </PageContainer>
    </MotionPage>
  );
}

export default memo(AdminExamDetailPage);
