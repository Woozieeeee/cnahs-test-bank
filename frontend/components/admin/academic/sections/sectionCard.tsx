"use client";

import Link from "next/link";
import MotionCard from "@/components/motion/motionCard";
import SectionCardActions from "./sectionCardActions";
import type { Section } from "@/types/section";

interface Props {
  section: Section;
}

export default function SectionCard({ section }: Props) {
  return (
    <MotionCard>
      <Link
        href={`/admin/academic/sections/${section.id}`}
        className="
          block
          rounded-2xl
          border
          border-border
          bg-card
          p-6
          transition
          hover:border-ring
          hover:shadow-sm
        "
      >
        {/* HEADER */}

        <div className="flex items-start justify-between">
          <div>
            <h2
              className="
        text-xl
        font-semibold
        text-foreground
      "
            >
              {section.name}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {section.program}
            </p>
          </div>

          <SectionCardActions
            onEdit={() => {
              console.log("Edit section");
            }}
            onArchive={() => {
              console.log("Archive section");
            }}
          />
        </div>

        {/* STATS */}

        <div
          className="
            mt-6
            grid
            grid-cols-2
            gap-4
          "
        >
          <div
            className="
              rounded-xl
              bg-muted
              p-4
            "
          >
            <p className="text-sm text-muted-foreground">
              Students
            </p>

            <p
              className="
                mt-2
                text-2xl
                font-bold
                text-foreground
              "
            >
              {section.users.length}
            </p>
          </div>

          <div
            className="
              rounded-xl
              bg-muted
              p-4
            "
          >
            <p className="text-sm text-muted-foreground">
              Exams
            </p>

            <p
              className="
                mt-2
                text-2xl
                font-bold
                text-foreground
              "
            >
              {section.exams.length}
            </p>
          </div>
        </div>

        {/* FOOTER */}

        <div
          className="
            mt-6
            flex
            items-center
            justify-between
            border-t
            border-white
            pt-4
          "
        >
          <p className="text-sm text-muted-foreground">
            View section details
          </p>

          <span
            className="
              text-sm
              font-medium
              text-slate-900
            "
          >
            →
          </span>
        </div>
      </Link>
    </MotionCard>
  );
}
