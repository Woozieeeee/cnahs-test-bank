"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import PageContainer from "@/components/layout/pages/pageContainer";
import BackButton from "@/components/common/backButton";
import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";
import NotFoundState from "@/components/common/states/notFoundState";

import useSectionId from "@/hooks/shared/useSectionId";

import StudentProfileHero from "@/components/admin/academic/sections/students/profile/studentProfileHero";
import StudentPerformanceStats from "@/components/admin/academic/sections/students/profile/studentPerformanceStats";
import StudentTopicStrengths from "@/components/admin/academic/sections/students/profile/studentTopicStrengths";
import StudentTopicWeaknesses from "@/components/admin/academic/sections/students/profile/studentTopicWeaknesses";
import StudentIntegritySummary from "@/components/admin/academic/sections/students/profile/studentIntegritySummary";
import StudentExamHistory from "@/components/admin/academic/sections/students/profile/studentExamHistory";

import { getStudentProfile } from "@/services/admin_service";

interface StudentProfile {
  profile: {
    id: number;
    name: string;
    email: string;
    studentId: string;
    accountAge: number;
    createdAt: string;
    updatedAt: string;
  };
  enrollments: {
    count: number;
    sections: Array<{ id: number; name: string; code: string; academicYear: string; semester: string }>;
  };
  performance: {
    totalAttempts: number;
    passedAttempts: number;
    passRate: number;
    averageScore: number;
  };
  recentExams: Array<{
    id: number;
    examId: number;
    examTitle: string;
    subjectName: string;
    subjectSlug: string;
    score: number;
    status: string;
    submittedAt: string;
    startedAt: string;
  }>;
  recentViolations: Array<{
    id: number;
    type: string;
    severity: string;
    description: string;
    resolved: boolean;
    timestamp: string;
  }>;
}

export default function StudentProfilePage() {
  const sectionId = useSectionId();
  const params = useParams();
  const studentId = Number(params.studentId);

  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getStudentProfile(studentId);

        if (response.success) {
          setProfile(response.data);
        } else {
          setError("Failed to load student profile");
        }
      } catch (err) {
        console.error("Error fetching student profile:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch student profile");
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchProfile();
    }
  }, [studentId]);

  if (loading) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading student profile..."
          description="Please wait while we retrieve student information."
        />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load student profile."
          description={error}
          onRetry={() => window.location.reload()}
        />
      </PageContainer>
    );
  }

  if (!profile) {
    return (
      <PageContainer>
        <NotFoundState
          title="Student not found."
          description="The requested student may have been removed."
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackButton
        href={`/admin/academic/sections/${sectionId}/students`}
        label="Back to Students"
      />

      <StudentProfileHero profile={profile} />

      <StudentPerformanceStats profile={profile} />
      
      <div className="grid gap-6 xl:grid-cols-2">
        <StudentTopicStrengths profile={profile} />
        <StudentTopicWeaknesses profile={profile} />
      </div>

      <StudentIntegritySummary profile={profile} />

      <StudentExamHistory profile={profile} />
    </PageContainer>
  );
}
