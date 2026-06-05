"use client";

import { useMemo, useState } from "react";

import useSectionId from "@/hooks/shared/useSectionId";
import useSection from "@/hooks/academic/useSection";

import PageContainer from "@/components/layout/pages/pageContainer";

import BackButton from "@/components/common/backButton";
import Pagination from "@/components/common/pagination";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";
import EmptyState from "@/components/common/states/emptyState";
import NotFoundState from "@/components/common/states/notFoundState";

import SectionStudentsStats from "@/components/admin/academic/sections/students/sectionStudentsStats";
import SectionStudentsSearch from "@/components/admin/academic/sections/students/sectionStudentsSearch";
import SectionStudentRoster from "@/components/admin/academic/sections/students/sectionStudentRoster";
import SectionStudentsTabs from "@/components/admin/academic/sections/students/sectionStudentsTabs";

import { mockSectionStudents } from "@/components/admin/academic/sections/data/mockSectionStudents";

export default function SectionStudentsPage() {
  const id = useSectionId();

  const { section, loading, error, refresh } =
    useSection(id);

  const [activeTab, setActiveTab] = useState("ALL");

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const PAGE_SIZE = 12;

  const filteredStudents = useMemo(() => {
    return mockSectionStudents.filter((student) => {
      const matchesSearch =
        student.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        student.studentId
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesTab =
        activeTab === "ALL"
          ? true
          : student.status === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [search, activeTab]);

  const startIndex = (page - 1) * PAGE_SIZE;

  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading students..."
          description="Please wait while we retrieve enrolled students."
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
          title="Failed to load students."
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
      {/* HEADER */}

      <div className="space-y-4">
        <BackButton
          href={`/admin/academic/sections/${section.id}`}
          label="Back to Section Overview"
        />

        <div>
          <h1 className="text-foreground text-3xl font-bold">
            Section Students
          </h1>

          <p className="text-muted-foreground mt-2">
            Students enrolled in {section.name}.
          </p>
        </div>
      </div>

      {/* STATS */}

      <SectionStudentsStats
        total={mockSectionStudents.length}
        regular={
          mockSectionStudents.filter(
            (student) => student.status === "REGULAR"
          ).length
        }
        irregular={
          mockSectionStudents.filter(
            (student) => student.status === "IRREGULAR"
          ).length
        }
        atRisk={
          mockSectionStudents.filter(
            (student) => student.status === "AT_RISK"
          ).length
        }
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SectionStudentsTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="w-full lg:w-80">
          <SectionStudentsSearch
            value={search}
            onChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* EMPTY */}

      {filteredStudents.length === 0 ? (
        <EmptyState
          title="No students found."
          description="Try adjusting your search."
        />
      ) : (
        <>
          {/* ROSTER */}

          <SectionStudentRoster
            sectionId={section.id}
            students={paginatedStudents}
          />

          {/* PAGINATION */}

          <Pagination
            currentPage={page}
            totalPages={Math.ceil(
              filteredStudents.length / PAGE_SIZE
            )}
            onPageChange={setPage}
          />
        </>
      )}
    </PageContainer>
  );
}
