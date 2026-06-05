"use client";

import { useMemo, useState } from "react";

import PageContainer from "@/components/layout/pages/pageContainer";

import BackButton from "@/components/common/backButton";

import Pagination from "@/components/common/pagination";

import useSectionId from "@/hooks/shared/useSectionId";

import useExamId from "@/hooks/exams/useExamId";

import ExamViolationsHeader from "@/components/admin/academic/sections/exams/violations/examViolationsHeader";

import ExamViolationsStats from "@/components/admin/academic/sections/exams/violations/examViolationsStats";

import ExamViolationTimeline from "@/components/admin/academic/sections/exams/violations/examViolationTimeline";

import ExamViolationDetailsModal from "@/components/admin/academic/sections/session/violations/examViolationDetailsModal";

import ExamViolationsTabs from "@/components/admin/academic/sections/exams/violations/examViolationsTabs";

import ExamViolationsSearch from "@/components/admin/academic/sections/exams/violations/examViolationsSearch";

import { mockExamViolationLogs } from "@/components/admin/academic/sections/data/mockExamViolationsLog";

import ExamViolationsToolbar from "@/components/admin/academic/sections/exams/violations/examViolationsToolbar";

import type { ExamViolation } from "@/types/assessments/examViolation";

const PAGE_SIZE = 10;

export default function ExamViolationsPage() {
  const sectionId = useSectionId();

  const examId = useExamId();

  const [activeTab, setActiveTab] = useState("ALL");

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [selectedViolation, setSelectedViolation] =
    useState<ExamViolation | null>(null);

  const filteredViolations = useMemo(() => {
    return mockExamViolationLogs.filter((violation) => {
      const matchesSearch =
        violation.student
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        violation.studentId
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        violation.type
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesSeverity =
        activeTab === "ALL"
          ? true
          : violation.severity === activeTab;

      return matchesSearch && matchesSeverity;
    });
  }, [search, activeTab]);

  const startIndex = (page - 1) * PAGE_SIZE;

  const paginatedViolations = filteredViolations.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  return (
    <PageContainer>
      <BackButton
        href={`/admin/academic/sections/${sectionId}/exams/${examId}`}
        label="Back to Exam"
      />

      <ExamViolationsHeader />

      <ExamViolationsStats
        total={24}
        high={8}
        medium={10}
        low={6}
      />

      <ExamViolationsToolbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setPage(1);
        }}
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      <ExamViolationTimeline
        violations={paginatedViolations}
        onSelectViolation={setSelectedViolation}
      />

      <Pagination
        currentPage={page}
        totalPages={Math.ceil(
          filteredViolations.length / PAGE_SIZE
        )}
        onPageChange={setPage}
      />

      <ExamViolationDetailsModal
        sectionId={sectionId}
        examId={examId}
        violation={selectedViolation}
        onClose={() => setSelectedViolation(null)}
      />
    </PageContainer>
  );
}
