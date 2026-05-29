"use client";

import Link from "next/link";

import MotionCard from "@/components/motion/motionCard";

import type { Section } from "@/types/section";

import SectionCardHeader from "./card/sectionCardHeader";

import SectionCardStats from "./card/sectionCardStats";

import SectionCardFooter from "./card/sectionCardFooter";

interface Props {
  section: Section;

  onRefresh: () => void;

  onEdit: () => void;
}

export default function SectionCard({
  section,
  onRefresh,
  onEdit,
}: Props) {
  return (
    <MotionCard>
      <Link
        href={`/admin/academic/sections/${section.id}`}
        className={`
          block
          rounded-2xl
          border
          bg-card
          p-6
          transition
          hover:shadow-sm

          ${
            section.isArchived
              ? `
                border-dashed
                border-muted
                opacity-70
              `
              : `
                border-border
                hover:border-ring
              `
          }
        `}
      >
        {/* HEADER */}

        <SectionCardHeader
          section={section}
          onRefresh={onRefresh}
          onEdit={onEdit}
        />

        {/* STATS */}

        <SectionCardStats section={section} />

        {/* FOOTER */}

        <SectionCardFooter />
      </Link>
    </MotionCard>
  );
}
