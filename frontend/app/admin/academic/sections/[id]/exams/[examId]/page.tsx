"use client";

import useSectionId from "@/hooks/shared/useSectionId";

import useExamId from "@/hooks/exams/useExamId";

import PageContainer from "@/components/layout/pages/pageContainer";

import ExamDetailsHeader from "@/components/admin/academic/sections/details/examDetailsHeader";

import ExamDetailsStats from "@/components/admin/academic/sections/details/examDetailsStats";

import ExamStudentsMonitoring from "@/components/admin/academic/sections/details/examStudentsMonitoring";

import ExamViolationsPreview from "@/components/admin/academic/sections/details/examViolationPreview";

export default function ExamDetailsPage() {
  const sectionId = useSectionId();

  const examId = useExamId();

  // TODO:
  // Replace with useExam(examId)
  // when exam backend endpoints are implemented.

  const exam = {
    id: examId,

    title: "Pharmacology Midterm",

    status: "ONGOING",

    difficulty: "MEDIUM",

    duration: 60,
  };

  return (
    <PageContainer>
      <ExamDetailsHeader
        sectionId={String(sectionId)}
        title={exam.title}
        status={exam.status}
      />

      <ExamDetailsStats
        difficulty={exam.difficulty}
        duration={exam.duration}
        activeStudents={18}
        violations={3}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <ExamStudentsMonitoring
          sectionId={String(sectionId)}
          examId={String(examId)}
        />

        <ExamViolationsPreview
          sectionId={String(sectionId)}
          examId={String(examId)}
        />
      </div>
    </PageContainer>
  );
}
