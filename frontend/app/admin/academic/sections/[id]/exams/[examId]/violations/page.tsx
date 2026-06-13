"use client";

import { useMemo, useState, useEffect } from "react";

import PageContainer from "@/components/layout/pages/pageContainer";

import BackButton from "@/components/common/backButton";

import Pagination from "@/components/common/pagination";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";
import EmptyState from "@/components/common/states/emptyState";

import useSectionId from "@/hooks/shared/useSectionId";

import useExamId from "@/hooks/exams/useExamId";

import ExamViolationsHeader from "@/components/admin/academic/sections/exams/violations/examViolationsHeader";

import ExamViolationsStats from "@/components/admin/academic/sections/exams/violations/examViolationsStats";

import ExamViolationTimeline from "@/components/admin/academic/sections/exams/violations/examViolationTimeline";

import ExamViolationDetailsModal from "@/components/admin/academic/sections/session/violations/examViolationDetailsModal";

import ExamViolationsToolbar from "@/components/admin/academic/sections/exams/violations/examViolationsToolbar";

import { getExamViolations } from "@/services/admin_service";

import type { ExamViolation } from "@/types/assessments/examViolation";

interface ViolationData {
  id: number;
  studentName: string;
  studentId: string;
  type: string;
  severity: string;
  timestamp: string;
  description: string;
  details: string;
  resolved: boolean;
  resolvedAt: string | null;
  resolvedBy: string | null;
}

interface ExamViolationsResponse {
  success: boolean;
  data: {
    exam: { id: number; title: string; section: { id: number; name: string } };
    violations: ViolationData[];
    stats: {
      totalViolations: number;
      resolved: number;
      unresolved: number;
      severityCounts: { LOW: number; MEDIUM: number; HIGH: number };
      typeCounts: { [key: string]: number };
    };
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

const PAGE_SIZE = 10;

export default function ExamViolationsPage() {
  const sectionId = useSectionId();

  const examId = useExamId();

  const [activeTab, setActiveTab] = useState("ALL");

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [selectedViolation, setSelectedViolation] = useState<any>(null);

  const [violations, setViolations] = useState<ViolationData[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  // =========================
  // FETCH VIOLATIONS FROM API
  // =========================

  useEffect(() => {
    const fetchViolations = async () => {
      try {
        setLoading(true);
        setError(undefined);

        const response = await getExamViolations(examId, {
          severity: activeTab !== "ALL" ? activeTab : undefined,
          page,
          limit: PAGE_SIZE,
        }) as ExamViolationsResponse;

        if (response.success) {
          setViolations(response.data.violations);
          setStats(response.data.stats);
        } else {
          setError("Failed to load violations");
        }
      } catch (err) {
        console.error("Error fetching violations:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch violations");
      } finally {
        setLoading(false);
      }
    };

    if (examId) {
      fetchViolations();
    }
  }, [examId, activeTab, page]);

  // =========================
  // FILTERS
  // =========================

  const filteredViolations = useMemo(() => {
    if (!search.trim()) return violations;

    const searchLower = search.toLowerCase();
    return violations.filter((violation) =>
      violation.studentName.toLowerCase().includes(searchLower) ||
      violation.studentId.toLowerCase().includes(searchLower) ||
      violation.type.toLowerCase().includes(searchLower)
    );
  }, [violations, search]);

  const totalPages = useMemo(() => {
    return stats ? stats.totalViolations / PAGE_SIZE : 0;
  }, [stats]);

  // =========================
  // LOADING & ERROR STATES
  // =========================

  if (loading && !violations.length) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading violations..."
          description="Please wait while we retrieve exam violations."
        />
      </PageContainer>
    );
  }

  if (error && !stats) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load violations."
          description={error}
          onRetry={() => window.location.reload()}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackButton
        href={`/admin/academic/sections/${sectionId}/exams/${examId}`}
        label="Back to Exam"
      />

      <ExamViolationsHeader />

      {stats && (
        <ExamViolationsStats
          total={stats.totalViolations}
          high={stats.severityCounts.HIGH || 0}
          medium={stats.severityCounts.MEDIUM || 0}
          low={stats.severityCounts.LOW || 0}
        />
      )}

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

      {filteredViolations.length === 0 ? (
        <EmptyState
          title="No violations found."
          description="There are no violations matching your filters."
        />
      ) : (
        <>
          <ExamViolationTimeline
            violations={filteredViolations.map((v) => ({
              id: v.id,
              student: v.studentName,
              studentId: v.studentId,
              type: v.type,
              severity: v.severity,
              timestamp: new Date(v.timestamp),
              description: v.description,
              resolved: v.resolved,
            } as any))}
            onSelectViolation={(v) => {
              const violation = filteredViolations.find(
                (fv) => fv.id === v.id
              );
              setSelectedViolation(violation);
            }}
          />

          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(totalPages)}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      <ExamViolationDetailsModal
        sectionId={sectionId}
        examId={examId}
        violation={selectedViolation}
        onClose={() => setSelectedViolation(null)}
      />
    </PageContainer>
  );
}
