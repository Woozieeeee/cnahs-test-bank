"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import PageContainer from "@/components/layout/pages/pageContainer";

import BackButton from "@/components/common/backButton";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";

import AssessmentDetailsHeader from "@/components/admin/academic/sections/subjects/assessment/details/assessmentDetailsHeader";

import AssessmentDetailsStats from "@/components/admin/academic/sections/subjects/assessment/details/assessmentDetailsStats";

import AssessmentDetailsAnalytics from "@/components/admin/academic/sections/subjects/assessment/details/assessmentDetailsAnalytics";

import AssessmentDetailsStudents from "@/components/admin/academic/sections/subjects/assessment/details/assessmentDetailsStudents";

import AssessmentDetailsViolations from "@/components/admin/academic/sections/subjects/assessment/details/assessmentDetailsViolations";

import { getAssessmentDetails } from "@/services/academic_service";

export default function AssessmentDetailsPage() {
  const params = useParams();

  const sectionId = Number(params.id);

  const subjectId = Number(params.subjectId);

  const assessmentId = Number(params.assessmentId);

  const [assessment, setAssessment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssessmentDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAssessmentDetails(assessmentId);
        setAssessment(data);
      } catch (err: any) {
        console.error("Failed to fetch assessment details:", err);
        setError(
          err?.response?.data?.message ??
            "Failed to load assessment details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAssessmentDetails();
  }, [assessmentId]);

  if (loading) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading assessment details..."
          description="Please wait while we retrieve the assessment data."
        />
      </PageContainer>
    );
  }

  if (error || !assessment) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load assessment"
          description={error || "Unable to retrieve assessment details"}
          onRetry={() => window.location.reload()}
        />
      </PageContainer>
    );
  }

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
        averageScore={assessment.averageScore || 0}
        passRate={assessment.passRate || 0}
        violations={assessment.violations || 0}
        expertReadyStudents={assessment.expertReadyStudents || 0}
      />

      {/* ANALYTICS */}

      <AssessmentDetailsAnalytics
        progression={assessment.progression || []}
        distribution={assessment.distribution || []}
      />

      {/* STUDENTS */}

      <AssessmentDetailsStudents
        students={assessment.students || []}
      />

      {/* VIOLATIONS */}

      <AssessmentDetailsViolations
        violations={assessment.violations || []}
      />
    </PageContainer>
  );
}
