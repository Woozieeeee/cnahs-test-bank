"use client";

import PageContainer from "@/components/layout/pages/pageContainer";
import { useParams } from "next/navigation";
import ExamDetailsHeader from "@/components/admin/academic/sections/details/examDetailsHeader";
import ExamDetailsStats from "@/components/admin/academic/sections/details/examDetailsStats";
import ExamStudentsMonitoring from "@/components/admin/academic/sections/details/examStudentsMonitoring";
import ExamViolationsPreview from "@/components/admin/academic/sections/details/examViolationPreview";

export default function ExamDetailsPage() {
  const params = useParams();
  const exam = {
    id: Number(params.examId),

    title: "Pharmacology Midterm",

    status: "ONGOING",

    difficulty: "MEDIUM",

    duration: 60,
  };

  return (
    <PageContainer>
      <ExamDetailsHeader
        sectionId={String(params.id)}
        title={exam.title}
        status={exam.status}
      />

      <ExamDetailsStats
        difficulty={exam.difficulty}
        duration={exam.duration}
        activeStudents={18}
        violations={3}
      />

      <div
        className="
      grid
      gap-6
      xl:grid-cols-2
    "
      >
        <ExamStudentsMonitoring
          sectionId={String(params.id)}
          examId={String(params.examId)}
        />

        <ExamViolationsPreview />
      </div>
    </PageContainer>
  );
}
