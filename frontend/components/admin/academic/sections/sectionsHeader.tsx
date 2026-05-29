"use client";

import MotionButton from "@/components/motion/motionButton";

import BackButton from "@/components/common/backButton";

import PageHeader from "@/components/layout/pages/pageHeader";

import PageTitle from "@/components/layout/pages/pageTitle";

interface Props {
  onCreate: () => void;
}

export default function SectionsHeader({
  onCreate,
}: Props) {
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

      <MotionButton
        onClick={onCreate}
        className="
          rounded-xl
          bg-card
          px-4
          py-2
          font-medium
          text-foreground
          transition
          hover:bg-muted
        "
      >
        Create Section
      </MotionButton>
    </PageHeader>
  );
}
