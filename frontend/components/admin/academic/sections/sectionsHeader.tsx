"use client";

import { memo } from "react";

import MotionButton from "@/components/motion/motionButton";

import BackButton from "@/components/common/backButton";

import PageHeader from "@/components/layout/pages/pageHeader";

import PageTitle from "@/components/layout/pages/pageTitle";

import PageActionButton from "@/components/common/buttons/pageActionButton";

interface Props {
  onCreate: () => void;
}

function SectionsHeader({ onCreate }: Props) {
  return (
    <PageHeader>
      <PageTitle
        title="Sections"
        description="Manage academic sections and classrooms."
      >
        <BackButton
          href="/admin/academic"
          label="Back to Academic Management"
        />
      </PageTitle>

      <PageActionButton onClick={onCreate}>
        Create Section
      </PageActionButton>
    </PageHeader>
  );
}

export default memo(SectionsHeader);
