"use client";

import PageContainer from "@/components/layout/pages/pageContainer";

import AcademicHeader from "./components/academicHeader";

import AcademicGrid from "./components/academicGrid.";

export default function AcademicPage() {
  return (
    <PageContainer>
      <AcademicHeader />

      <AcademicGrid />
    </PageContainer>
  );
}
