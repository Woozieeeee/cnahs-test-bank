"use client";

import { useMemo, useState } from "react";
import PageContainer from "@/components/layout/pages/pageContainer";
import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";
import Pagination from "@/components/common/pagination";
import useFacultyExams from "@/hooks/exams/useFacultyExams";
import ExamHeader from "@/components/faculty/exams/examHeader";
import ExamStats from "@/components/faculty/exams/examStats";
import ExamFilters from "@/components/faculty/exams/examFilters";
import ExamStatusTabs from "@/components/faculty/exams/examStatusTabs";
import ExamCard from "@/components/faculty/exams/examCard";
import CreateExamSetupModal from "@/components/faculty/exams/modal/createExamSetupModal";

const ITEMS_PER_PAGE = 12;

export default function FacultyExamsPage() {
  const { exams, loading, error, refresh } =
    useFacultyExams();

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("ALL");

  const [section, setSection] = useState("ALL");

  const [currentPage, setCurrentPage] = useState(1);

  const [showSetupModal, setShowSetupModal] =
    useState(false);

  const [examSetup, setExamSetup] = useState<any>(null);

  const sections = useMemo(() => {
    return Array.from(
      new Set(exams.map((exam) => exam.sectionName))
    );
  }, [exams]);

  const filteredExams = useMemo(() => {
    let result = [...exams];

    if (search.trim()) {
      result = result.filter(
        (exam) =>
          exam.title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          exam.subjectName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          exam.sectionName
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (status !== "ALL") {
      result = result.filter(
        (exam) => exam.status === status
      );
    }

    if (section !== "ALL") {
      result = result.filter(
        (exam) => exam.sectionName === section
      );
    }

    return result;
  }, [exams, search, status, section]);

  const totalPages =
    Math.ceil(filteredExams.length / ITEMS_PER_PAGE) || 1;

  const paginatedExams = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredExams.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [filteredExams, currentPage]);

  if (loading) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading exams..."
          description="Please wait while we retrieve exam records."
        />
      </PageContainer>
    );
  }

  if (error) {
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
    <PageContainer>
      <ExamHeader
        onCreate={() => setShowSetupModal(true)}
      />

      <ExamStats exams={exams} />

      <ExamFilters
        search={search}
        setSearch={setSearch}
        section={section}
        setSection={setSection}
        sections={sections}
        suggestions={exams.map((exam) => exam.title)}
      />

      <ExamStatusTabs
        activeTab={status}
        setActiveTab={setStatus}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {paginatedExams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <CreateExamSetupModal
        open={showSetupModal}
        onClose={() => setShowSetupModal(false)}
        onContinue={(data) => {
          setExamSetup(data);

          setShowSetupModal(false);

          console.log(data);
        }}
      />
    </PageContainer>
  );
}
