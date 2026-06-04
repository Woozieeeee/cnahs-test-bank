"use client";

import { memo } from "react";

import Link from "next/link";

import MotionCard from "@/components/motion/motionCard";

import type { Section } from "@/types/section";

import SectionCardHeader from "./card/sectionCardHeader";

import SectionCardStats from "./card/sectionCardStats";

import CardFooterLink from "@/components/common/cards/cardFooterLink";

interface Props {
  section: Section;

  onRefresh: () => void;

  onEdit: () => void;
}

function SectionCard({
  section,
  onRefresh,
  onEdit,
}: Props) {
  return (
    <MotionCard>
      <Link
        href={`/admin/academic/sections/${section.id}`}
        className={`bg-card block rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${
          section.isArchived
            ? `border-muted border-dashed opacity-70`
            : `border-border hover:border-ring`
        } `}
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

        <CardFooterLink label="View section details" />
      </Link>
    </MotionCard>
  );
}

export default memo(SectionCard);
