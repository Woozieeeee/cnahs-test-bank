"use client";

import { useMemo, useState } from "react";

import useSectionId from "@/hooks/shared/useSectionId";
import useSection from "@/hooks/academic/useSection";

import PageContainer from "@/components/layout/pages/pageContainer";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";
import EmptyState from "@/components/common/states/emptyState";
import NotFoundState from "@/components/common/states/notFoundState";

import Pagination from "@/components/common/pagination";

import SectionSubjectsHeader from "@/components/admin/academic/sections/subjects/sectionSubjectsHeader";
import SectionSubjectsList from "@/components/admin/academic/sections/subjects/sectionSubjectsList";

import SectionSubjectsStats from "@/components/admin/academic/sections/subjects/sectionSubjectsStats";
import SectionSubjectsTabs from "@/components/admin/academic/sections/subjects/sectionSubjectsTabs";
import SectionSubjectsSearch from "@/components/admin/academic/sections/subjects/sectionSubjectsSearch";

import { mockSectionSubjects } from "@/components/admin/academic/sections/data/mockSectionSubjects";

const ITEMS_PER_PAGE = 9;

export default function SectionSubjectsPage() {
  const id = useSectionId();

  const { section, loading, error, refresh } =
    useSection(id);

  const [currentPage, setCurrentPage] = useState(1);

  const [activeTab, setActiveTab] = useState("ALL");

  const [search, setSearch] = useState("");

  // =========================
  // SUBJECTS
  // =========================

  const subjects = useMemo(() => {
    if (!section) return [];

    return section.sectionSubjects.length > 0
      ? section.sectionSubjects
      : mockSectionSubjects;
  }, [section]);

  // =========================
  // FILTERS
  // =========================

  const filteredSubjects = useMemo(() => {
    const searchTerm = search.toLowerCase();

    return subjects.filter((item) => {
      const subject = item.subject;

      const matchesSearch =
        subject.name.toLowerCase().includes(searchTerm) ||
        subject.code.toLowerCase().includes(searchTerm);

      const matchesTab =
        activeTab === "ALL"
          ? true
          : activeTab === "WITH FACULTY"
            ? !!subject.faculty
            : !subject.faculty;

      return matchesSearch && matchesTab;
    });
  }, [subjects, search, activeTab]);

  // =========================
  // PAGINATION
  // =========================

  const totalPages = useMemo(() => {
    return Math.ceil(
      filteredSubjects.length / ITEMS_PER_PAGE
    );
  }, [filteredSubjects]);

  const paginatedSubjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredSubjects.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [filteredSubjects, currentPage]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading subjects..."
          description="Please wait while we retrieve assigned subjects."
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
          title="Failed to load subjects."
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

  return (
    <PageContainer>
      <SectionSubjectsHeader
        sectionId={id}
        sectionName={section.name}
      />

      {/* STATS */}

      <SectionSubjectsStats
        totalSubjects={subjects.length}
        assignedFaculty={
          subjects.filter((item) => item.subject.faculty)
            .length
        }
        withExams={subjects.length}
        withoutFaculty={
          subjects.filter((item) => !item.subject.faculty)
            .length
        }
      />

      {/* FILTERS */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SectionSubjectsTabs
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setCurrentPage(1);
          }}
        />

        <div className="w-full lg:w-80">
          <SectionSubjectsSearch
            value={search}
            onChange={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* CONTENT */}

      {filteredSubjects.length === 0 ? (
        <EmptyState
          title="No subjects found."
          description="Try adjusting your filters."
        />
      ) : (
        <>
          <SectionSubjectsList
            subjects={paginatedSubjects}
            sectionId={id}
          />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </PageContainer>
  );
}
