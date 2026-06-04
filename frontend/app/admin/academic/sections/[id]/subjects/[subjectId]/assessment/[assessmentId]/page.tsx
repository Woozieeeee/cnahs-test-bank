"use client";

import { useParams } from "next/navigation";

import PageContainer from "@/components/layout/pages/pageContainer";

import BackButton from "@/components/common/backButton";

import AssessmentDetailsHeader from "@/components/admin/academic/sections/subjects/assessment/details/assessmentDetailsHeader";

import AssessmentDetailsStats from "@/components/admin/academic/sections/subjects/assessment/details/assessmentDetailsStats";

import AssessmentDetailsAnalytics from "@/components/admin/academic/sections/subjects/assessment/details/assessmentDetailsAnalytics";

import AssessmentDetailsStudents from "@/components/admin/academic/sections/subjects/assessment/details/assessmentDetailsStudents";

import AssessmentDetailsViolations from "@/components/admin/academic/sections/subjects/assessment/details/assessmentDetailsViolations";

import { mockAssessmentDetails } from "@/components/admin/academic/sections/data/mockAssessmentDetails";

import { mockAssessmentStudents } from "@/components/admin/academic/sections/data/mockAssessmentStudents";

import { mockAssessmentViolations } from "@/components/admin/academic/sections/data/mockAssessmentViolations";

export default function AssessmentDetailsPage() {
  const assessment = mockAssessmentDetails;
  const params = useParams();

  const sectionId = Number(params.id);

  const subjectId = Number(params.subjectId);

  const assessmentId = Number(params.assessmentId);

  return (
    <PageContainer>
      <BackButton
        href={`/admin/academic/sections/${sectionId}/subjects/${subjectId}/assessment`}
        label="Back to Assessments"
      />
      {/* HEADER */}

      <AssessmentDetailsHeader
        title={assessment.title}
        difficulty={assessment.difficulty}
        status={assessment.status}
      />

      {/* STATS */}

      <AssessmentDetailsStats
        averageScore={assessment.averageScore}
        passRate={assessment.passRate}
        violations={assessment.violations}
        expertReadyStudents={assessment.expertReadyStudents}
      />

      {/* ANALYTICS */}

      <AssessmentDetailsAnalytics
        progression={assessment.progression}
        distribution={assessment.distribution}
      />

      {/* STUDENTS */}

      <AssessmentDetailsStudents
        students={mockAssessmentStudents}
      />

      {/* VIOLATIONS */}

      <AssessmentDetailsViolations
        violations={mockAssessmentViolations}
      />
    </PageContainer>
  );
}
