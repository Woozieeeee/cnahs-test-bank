"use client";

import BackButton from "@/components/common/backButton";

import PageHeader from "@/components/layout/pages/pageHeader";
import PageTitle from "@/components/layout/pages/pageTitle";

interface Props {
  sectionId: number;

  sectionName: string;
}

export default function SectionSubjectsHeader({
  sectionId,
  sectionName,
}: Props) {
  return (
    <PageHeader>
      <PageTitle
        title="Section Subjects"
        description={`Subjects assigned to ${sectionName}.`}
      >
        <BackButton
          href={`/admin/academic/sections/${sectionId}`}
          label="Back to Section Overview"
        />
      </PageTitle>
    </PageHeader>
  );
}
