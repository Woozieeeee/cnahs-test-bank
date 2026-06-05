"use client";

import { useMemo, useState } from "react";

import { useParams } from "next/navigation";

import PageContainer from "@/components/layout/pages/pageContainer";

import BackButton from "@/components/common/backButton";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";
import EmptyState from "@/components/common/states/emptyState";

import useSubjectAssessments from "@/hooks/faculty/subjects/useSubjectAssessments";

import AssessmentStats from "@/components/faculty/assessments/assessmentStats";
import AssessmentStatusTabs from "@/components/faculty/assessments/assessmentStatusTabs";
import AssessmentFilters from "@/components/faculty/assessments/assessmentFilters";
import AssessmentCard from "@/components/faculty/assessments/assessmentCard";

export default function FacultySubjectAssessmentsPage() {
  const params = useParams();

  const subjectId = Number(params.subjectId);

  const { data, loading, error, refresh } =
    useSubjectAssessments(subjectId);

  const [search, setSearch] = useState("");

  const [activeTab, setActiveTab] = useState<
    | "ALL"
    | "DRAFT"
    | "SCHEDULED"
    | "ONGOING"
    | "COMPLETED"
    | "ARCHIVED"
  >("ALL");

  const [sectionId, setSectionId] = useState("ALL");

  const filteredAssessments = useMemo(() => {
    if (!data) {
      return [];
    }

    let result = [...data.assessments];

    if (search.trim()) {
      result = result.filter((assessment) =>
        assessment.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (activeTab !== "ALL") {
      result = result.filter(
        (assessment) => assessment.status === activeTab
      );
    }

    if (sectionId !== "ALL") {
      result = result.filter(
        (assessment) =>
          assessment.section.id === Number(sectionId)
      );
    }

    return result;
  }, [data, search, activeTab, sectionId]);

  const stats = useMemo(() => {
    if (!data) {
      return {
        total: 0,
        draft: 0,
        scheduled: 0,
        ongoing: 0,
        completed: 0,
      };
    }

    return {
      total: data.assessments.length,

      draft: data.assessments.filter(
        (assessment) => assessment.status === "DRAFT"
      ).length,

      scheduled: data.assessments.filter(
        (assessment) => assessment.status === "SCHEDULED"
      ).length,

      ongoing: data.assessments.filter(
        (assessment) => assessment.status === "ONGOING"
      ).length,

      completed: data.assessments.filter(
        (assessment) => assessment.status === "COMPLETED"
      ).length,
    };
  }, [data]);

  if (loading) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading assessments..."
          description="Please wait while we retrieve assessment data."
        />
      </PageContainer>
    );
  }

  if (error || !data) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load assessments."
          description={
            error || "Unable to retrieve assessment data."
          }
          onRetry={refresh}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackButton
        href={`/faculty/subjects/${subjectId}`}
        label="Back to Subject"
      />

      <div>
        <h1 className="text-3xl font-bold">Assessments</h1>

        <p className="text-muted-foreground mt-2">
          View and monitor assessments for this subject
          across all assigned sections.
        </p>
      </div>

      <AssessmentStats
        total={stats.total}
        draft={stats.draft}
        scheduled={stats.scheduled}
        ongoing={stats.ongoing}
        completed={stats.completed}
      />

      <AssessmentStatusTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <AssessmentFilters
        search={search}
        setSearch={setSearch}
        sectionId={sectionId}
        setSectionId={setSectionId}
        sections={data.sections}
        assessments={data.assessments.map(
          (assessment) => assessment.title
        )}
      />

      {filteredAssessments.length === 0 ? (
        <EmptyState
          title="No assessments found"
          description="No assessments match the selected filters."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredAssessments.map((assessment) => (
            <AssessmentCard
              key={assessment.id}
              assessment={assessment}
            />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
