"use client";

import { useMemo, useState } from "react";
import type { CreateExamSetup } from "@/types/exams/createExamSetup";
import PageContainer from "@/components/layout/pages/pageContainer";
import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";
import Pagination from "@/components/common/pagination";
import useFacultyExams from "@/hooks/exams/useFacultyExams";
import useFacultySections from "@/hooks/exams/useFacultySections";
import ExamHeader from "@/components/faculty/exams/examHeader";
import ExamStats from "@/components/faculty/exams/examStats";
import ExamFilters from "@/components/faculty/exams/examFilters";
import ExamStatusTabs from "@/components/faculty/exams/examStatusTabs";
import ExamCard from "@/components/faculty/exams/examCard";
import SectionCard from "@/components/faculty/exams/sectionCard";
import EmptyState from "@/components/common/states/emptyState";
import CreateExamSetupModal from "@/components/faculty/exams/modal/createExamSetupModal";
import CreateExamWizardModal from "@/components/faculty/exams/modal/createExamWizardModal";

const ITEMS_PER_PAGE = 12;

export default function FacultyExamsPage() {
  const { exams, loading, error, refresh } =
    useFacultyExams();

  const { sections, loading: sectionsLoading } =
    useFacultySections();

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("ALL");

  const [section, setSection] = useState("ALL");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedSectionId, setSelectedSectionId] =
    useState<number | null>(null);

  const [showSetupModal, setShowSetupModal] =
    useState(false);

  const [examSetup, setExamSetup] =
    useState<CreateExamSetup | null>(null);

  const [showWizardModal, setShowWizardModal] =
    useState(false);

  const sectionNames = useMemo(() => {
    return Array.from(
      new Set(exams.map((exam) => exam.sectionName))
    );
  }, [exams]);

  const handleSectionCardClick = (sectionId: number) => {
    if (selectedSectionId === sectionId) {
      setSelectedSectionId(null);
      setSection("ALL");
    } else {
      setSelectedSectionId(sectionId);
      const sectionData = sections.find(
        (s: any) => s.id === sectionId
      );
      if (sectionData) {
        setSection(sectionData.name);
      }
    }
    setCurrentPage(1);
  };

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

  if (loading || sectionsLoading) {
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
      <ExamStats exams={exams} />

      {sections.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-4 text-lg font-semibold">
            Select Section
          </h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sections.map((sectionData) => (
              <SectionCard
                key={sectionData.id}
                section={sectionData}
                onClick={() =>
                  handleSectionCardClick(sectionData.id)
                }
                isSelected={
                  selectedSectionId === sectionData.id
                }
              />
            ))}
          </div>
        </div>
      )}

      <ExamFilters
        search={search}
        setSearch={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
        section={section}
        setSection={(value) => {
          setSection(value);
          setCurrentPage(1);
        }}
        sections={sectionNames}
        suggestions={exams.map((exam) => exam.title)}
      />

      <ExamStatusTabs
        activeTab={status}
        setActiveTab={(value) => {
          setStatus(value);
          setCurrentPage(1);
        }}
      />

      {paginatedExams.length === 0 ? (
        <div className="flex min-h-[500px] items-center justify-center">
          <EmptyState
            title="No exams found"
            description="Create your first exam to begin assessing students."
          />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {paginatedExams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </PageContainer>
  );
}
