"use client";

import MotionPage from "@/components/motion/motionPage";

import PageContainer from "@/components/layout/pages/pageContainer";

import ExamsHeader from "@/components/admin/exams/examsHeader";

import SectionGrid from "@/components/admin/exams/sectionGrid";

export default function AdminExamsPage() {
  return (
    <MotionPage>
      <PageContainer>
        <ExamsHeader />

        <SectionGrid />
      </PageContainer>
    </MotionPage>
  );
}
