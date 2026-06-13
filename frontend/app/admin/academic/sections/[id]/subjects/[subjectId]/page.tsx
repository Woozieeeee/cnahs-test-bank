"use client";

import { useMemo, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import useSectionId from "@/hooks/shared/useSectionId";
import useSection from "@/hooks/academic/useSection";

import PageContainer from "@/components/layout/pages/pageContainer";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";
import NotFoundState from "@/components/common/states/notFoundState";

import SubjectDetailsHeader from "@/components/admin/academic/sections/subjects/details/subjectDetailsHeader";

import SubjectHeroCard from "@/components/admin/academic/sections/subjects/details/subjectHeroCard";
import SubjectStatsGrid from "@/components/admin/academic/sections/subjects/details/subjectStatsGrid";
import SubjectFacultyCard from "@/components/admin/academic/sections/subjects/details/subjectFacultyCard";
import SubjectStudentDistributionCard from "@/components/admin/academic/sections/subjects/details/subjectStudentDistributionCard";
import SubjectQuickAccessSection from "@/components/admin/academic/sections/subjects/details/subjectQuickAccessSection";

import { getSectionSubjectDetails } from "@/services/admin_service";

interface SectionSubjectDetails {
  section: {
    id: number;
    name: string;
  };
  subject: {
    id: number;
    name: string;
    code: string;
    slug: string;
    description: string;
  };
  faculty: {
    id: number;
    name: string;
    username: string;
  } | null;
  statistics: {
    totalQuestions: number;
    totalExams: number;
    totalStudents: number;
    totalAttempts: number;
    passedAttempts: number;
    passRate: number;
    averageScore: number;
  };
  exams: any[];
  questions: {
    count: number;
    byDifficulty: {
      EASY: number;
      MEDIUM: number;
      HARD: number;
    };
    byTopic: Array<{
      topic: string;
      count: number;
    }>;
  };
  studentPerformance: Array<{
    studentId: number;
    name: string;
    enrollmentId: string;
    totalAttempts: number;
    passedAttempts: number;
    passRate: number;
    averageScore: number;
  }>;
}

export default function SubjectDetailsPage() {
  const sectionId = useSectionId();

  const params = useParams();

  const subjectId = Number(params.subjectId);

  const { section, loading, error, refresh } =
    useSection(sectionId);

  const [subjectDetails, setSubjectDetails] = useState<SectionSubjectDetails | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState<string | undefined>(undefined);

  // =========================
  // SUBJECT
  // =========================

  const sectionSubject = useMemo(() => {
    if (!section) return null;

    const found = section.sectionSubjects.find(
      (item) => item.subject.id === subjectId
    );

    return found || null;
  }, [section, subjectId]);

  // =========================
  // FETCH SECTION SUBJECT DETAILS (PHASE 4)
  // =========================

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setDetailsLoading(true);
        setDetailsError(undefined);

        const response = await getSectionSubjectDetails(sectionId, subjectId);
        if (response.success) {
          setSubjectDetails(response.data);
        } else {
          setDetailsError("Failed to load subject details");
        }
      } catch (err) {
        console.error("Error fetching subject details:", err);
        setDetailsError(err instanceof Error ? err.message : "Failed to fetch subject details");
      } finally {
        setDetailsLoading(false);
      }
    };

    if (!loading && sectionSubject && sectionId) {
      fetchDetails();
    }
  }, [sectionId, subjectId, loading, sectionSubject]);

  // =========================
  // LOADING
  // =========================

  if (loading || detailsLoading) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading subject..."
          description="Please wait while we retrieve subject information."
        />
      </PageContainer>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error || detailsError) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load subject."
          description={error || detailsError}
          onRetry={refresh}
        />
      </PageContainer>
    );
  }

  // =========================
  // NOT FOUND
  // =========================

  if (!section || !sectionSubject || !subjectDetails) {
    return (
      <PageContainer>
        <NotFoundState
          title="Subject not found."
          description="The requested subject may have been removed or is not assigned to this section."
        />
      </PageContainer>
    );
  }

  const subject = subjectDetails.subject;
  const stats = subjectDetails.statistics;
  
  // Calculate student distribution for display
  const passingStudents = subjectDetails.studentPerformance.filter(
    (s) => s.passRate >= 70
  ).length;
  const inactiveStudents = subjectDetails.studentPerformance.filter(
    (s) => s.totalAttempts === 0
  ).length;

  return (
    <PageContainer>
      <SubjectDetailsHeader
        sectionId={sectionId}
        subject={subject}
      />

      <SubjectHeroCard subject={subject} />

      <SubjectStatsGrid
        averageScore={stats.averageScore}
        passingRate={stats.passRate}
        highestScore={100}
        lowestScore={0}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <SubjectFacultyCard subject={subject} />

        <SubjectStudentDistributionCard
          regular={passingStudents}
          irregular={inactiveStudents}
        />
      </div>

      <SubjectQuickAccessSection
        sectionId={sectionId}
        subjectId={subject.id}
      />
    </PageContainer>
  );
}
