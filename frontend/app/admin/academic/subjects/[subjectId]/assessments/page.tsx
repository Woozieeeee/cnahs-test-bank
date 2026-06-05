"use client";

import { useMemo, useState } from "react";

import { useParams } from "next/navigation";

import PageContainer from "@/components/layout/pages/pageContainer";

import BackButton from "@/components/common/backButton";

import Pagination from "@/components/common/pagination";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";
import NotFoundState from "@/components/common/states/notFoundState";

import useSubject from "@/hooks/academic/useSubject";

import AssessmentHeader from "@/components/admin/academic/subjects/assessments/assessmentHeader";

import AssessmentStats from "@/components/admin/academic/subjects/assessments/assessmentStats";

import AssessmentFilters from "@/components/admin/academic/subjects/assessments/assessmentFilters";

import AssessmentTable from "@/components/admin/academic/subjects/assessments/assessmentTable";

import useSubjectAssessments from "@/hooks/faculty/subjects/useSubjectAssessments";

export default function SubjectAssessmentsPage() {
  const params = useParams();

  const subjectId = Number(params.subjectId);

  const { subject, loading, error, refresh } =
    useSubject(subjectId);

  const {
    data,
    loading: assessmentsLoading,
    error: assessmentsError,
    refresh: refreshAssessments,
  } = useSubjectAssessments(subjectId);

  const assessments = data?.assessments ?? [];

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  // =========================
  // FILTERING
  // =========================

  const filteredAssessments = useMemo(() => {
    let result = [...assessments];

    if (search.trim()) {
      result = result.filter((assessment) =>
        assessment.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (status) {
      result = result.filter(
        (assessment) => assessment.status === status
      );
    }

    return result;
  }, [search, status]);

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    filteredAssessments.length / pageSize
  );

  const paginatedAssessments = useMemo(() => {
    const start = (currentPage - 1) * pageSize;

    return filteredAssessments.slice(
      start,
      start + pageSize
    );
  }, [filteredAssessments, currentPage]);

  // =========================
  // STATS
  // =========================

  const scores: number[] = [];

  const averageScore =
    scores.length === 0
      ? 0
      : Math.round(
          scores.reduce((sum, score) => sum + score, 0) /
            scores.length
        );

  const highestScore =
    scores.length === 0 ? 0 : Math.max(...scores);

  const lowestScore =
    scores.length === 0 ? 0 : Math.min(...scores);

  // =========================
  // LOADING
  // =========================

  if (loading || assessmentsLoading) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading assessments..."
          description="Please wait while we retrieve assessment data."
        />
      </PageContainer>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error || assessmentsError) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load assessments."
          description={error || assessmentsError || ""}
          onRetry={refresh}
        />
      </PageContainer>
    );
  }

  // =========================
  // NOT FOUND
  // =========================

  if (!subject) {
    return (
      <PageContainer>
        <NotFoundState
          title="Subject not found."
          description="The requested subject may have been removed."
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackButton
        href={`/admin/academic/subjects/${subjectId}`}
        label="Back to Subject"
      />

      <AssessmentHeader
        subjectName={subject.name}
        subjectCode={subject.code}
      />

      <AssessmentStats
        totalAssessments={assessments.length}
        averageScore={averageScore}
        highestScore={highestScore}
        lowestScore={lowestScore}
      />

      <AssessmentFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <AssessmentTable
        subjectId={subjectId}
        assessments={paginatedAssessments}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </PageContainer>
  );
}
