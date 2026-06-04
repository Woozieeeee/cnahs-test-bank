"use client";

import { useEffect, useMemo, useState } from "react";

import useSectionId from "@/hooks/useSectionId";
import useSection from "@/hooks/useSection";

import PageContainer from "@/components/layout/pages/pageContainer";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";
import EmptyState from "@/components/common/states/emptyState";
import NotFoundState from "@/components/common/states/notFoundState";

import Pagination from "@/components/common/pagination";

import SectionExamsHeader from "@/components/admin/academic/sections/exams/sectionExamsHeader";
import SectionExamsList from "@/components/admin/academic/sections/exams/sectionExamsList";
import SectionExamsStats from "@/components/admin/academic/sections/exams/sectionExamsStats";

import SectionExamsTabs from "@/components/admin/academic/sections/exams/sectionExamsTabs";

import SectionExamsSearch from "@/components/admin/academic/sections/exams/sectionExamsSearch";
import { mockSectionExams } from "@/components/admin/academic/sections/data/mockSectionsExam";

const ITEMS_PER_PAGE = 9;

export default function SectionExamsPage() {
  const id = useSectionId();

  const { section, loading, error, refresh } =
    useSection(id);

  const [currentPage, setCurrentPage] = useState(1);

  const [activeTab, setActiveTab] = useState("ALL");

  const [search, setSearch] = useState("");

  // =========================
  // RESET PAGE
  // =========================

  useEffect(() => {
    setCurrentPage(1);
  }, [id]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, search]);

  // =========================
  // EXAMS
  // =========================

  const exams = useMemo(() => {
    if (!section) return [];

    return section.exams.length > 0
      ? section.exams
      : mockSectionExams;
  }, [section]);

  const filteredExams = useMemo(() => {
    const searchTerm = search.toLowerCase();

    return exams.filter((exam) => {
      const matchesSearch =
        exam.title.toLowerCase().includes(searchTerm) ||
        exam.description
          ?.toLowerCase()
          .includes(searchTerm);

      const matchesTab =
        activeTab === "ALL"
          ? true
          : exam.status?.toUpperCase() ===
            activeTab.toUpperCase();

      return matchesSearch && matchesTab;
    });
  }, [exams, search, activeTab]);

  // =========================
  // PAGINATION
  // =========================

  const totalPages = useMemo(() => {
    return Math.ceil(filteredExams.length / ITEMS_PER_PAGE);
  }, [filteredExams]);

  const paginatedExams = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredExams.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [filteredExams, currentPage]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading exams..."
          description="Please wait while we retrieve section exams."
        />
      </PageContainer>
    );
  }

  // =========================
  // ERROR
  // =========================

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

  // =========================
  // NOT FOUND
  // =========================

  if (!section) {
    return (
      <PageContainer>
        <NotFoundState
          title="Section not found."
          description="The requested section may have been removed."
        />
      </PageContainer>
    );
  }

  // =========================
  // EMPTY
  // =========================

  if (
    exams.length === 0 &&
    !search &&
    activeTab === "ALL"
  ) {
    return (
      <PageContainer>
        <SectionExamsHeader
          sectionId={id}
          sectionName={section.name}
        />

        <EmptyState
          title="No exams available."
          description="Exams will appear here once they are created for this section."
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SectionExamsHeader
        sectionId={id}
        sectionName={section.name}
      />

      <SectionExamsStats
        total={exams.length}
        scheduled={
          exams.filter(
            (exam) => exam.status === "SCHEDULED"
          ).length
        }
        ongoing={
          exams.filter((exam) => exam.status === "ONGOING")
            .length
        }
        completed={
          exams.filter(
            (exam) => exam.status === "COMPLETED"
          ).length
        }
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SectionExamsTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="w-full lg:w-80">
          <SectionExamsSearch
            value={search}
            onChange={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {filteredExams.length === 0 ? (
        <EmptyState
          title="No exams found."
          description="Try adjusting your filters."
        />
      ) : (
        <>
          <SectionExamsList
            exams={paginatedExams}
            sectionId={id}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </PageContainer>
  );
}
