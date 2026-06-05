"use client";

import PageContainer from "@/components/layout/pages/pageContainer";

import BackButton from "@/components/common/backButton";

import useSectionId from "@/hooks/shared/useSectionId";

import StudentProfileHero from "@/components/admin/academic/sections/students/profile/studentProfileHero";

import StudentPerformanceStats from "@/components/admin/academic/sections/students/profile/studentPerformanceStats";

import StudentTopicStrengths from "@/components/admin/academic/sections/students/profile/studentTopicStrengths";

import StudentTopicWeaknesses from "@/components/admin/academic/sections/students/profile/studentTopicWeaknesses";

import StudentIntegritySummary from "@/components/admin/academic/sections/students/profile/studentIntegritySummary";

import StudentExamHistory from "@/components/admin/academic/sections/students/profile/studentExamHistory";

export default function StudentProfilePage() {
  const sectionId = useSectionId();

  return (
    <PageContainer>
      <BackButton
        href={`/admin/academic/sections/${sectionId}/students`}
        label="Back to Students"
      />

      <StudentProfileHero />

      <StudentPerformanceStats />
      <div className="grid gap-6 xl:grid-cols-2">
        <StudentTopicStrengths />

        <StudentTopicWeaknesses />
      </div>

      <StudentIntegritySummary />

      <StudentExamHistory />
    </PageContainer>
  );
}
