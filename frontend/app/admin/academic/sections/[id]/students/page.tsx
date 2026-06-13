"use client";

import { useMemo, useState, useEffect } from "react";

import useSectionId from "@/hooks/shared/useSectionId";
import useSection from "@/hooks/academic/useSection";
import { getSectionStudents } from "@/services/admin_service";

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

interface Student {
  id: number;
  name: string;
  studentId: string;
  accountStatus: string;
  studentStatus: "PASSING" | "STRUGGLING" | "INACTIVE";
  totalAttempts: number;
  passedExams: number;
  enrolledDate: string;
}

interface SectionStudentsResponse {
  success: boolean;
  data: {
    section: {
      id: number;
      name: string;
    };
    students: Student[];
    total: number;
    stats: {
      passing: number;
      inactive: number;
      struggling: number;
    };
  };
}

export default function SectionStudentsPage() {
  const id = useSectionId();

  const { section, loading: sectionLoading, error: sectionError, refresh } =
    useSection(id);

  const [students, setStudents] = useState<Student[]>([]);
  const [stats, setStats] = useState({ passing: 0, inactive: 0, struggling: 0 });
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [studentsError, setStudentsError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState("ALL");

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const PAGE_SIZE = 12;

  // Fetch students from API
  useEffect(() => {
    if (!id || sectionLoading) return;

    const fetchStudents = async () => {
      try {
        setStudentsLoading(true);
        setStudentsError(null);

        const response = await getSectionStudents(id) as SectionStudentsResponse;

        if (response.success) {
          setStudents(response.data.students);
          setStats(response.data.stats);
        } else {
          setStudentsError("Failed to load students");
        }
      } catch (err) {
        console.error("Error fetching students:", err);
        setStudentsError("Failed to load students data");
      } finally {
        setStudentsLoading(false);
      }
    };

    fetchStudents();
  }, [id, sectionLoading]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
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
          : student.studentStatus === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [search, activeTab, students]);

  const startIndex = (page - 1) * PAGE_SIZE;

  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  // =========================
  // LOADING
  // =========================

  if (sectionLoading || studentsLoading) {
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

  if (sectionError || studentsError) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load students."
          description={sectionError || studentsError || "Unknown error"}
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
        total={stats.passing + stats.inactive + stats.struggling}
        passing={stats.passing}
        inactive={stats.inactive}
        struggling={stats.struggling}
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
