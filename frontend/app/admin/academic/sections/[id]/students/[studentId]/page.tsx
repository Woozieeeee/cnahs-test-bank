"use client";

import { useParams } from "next/navigation";

import PageContainer from "@/components/layout/pages/pageContainer";

import StudentSessionHeader from "@/components/admin/academic/sections/session/studentSessionHeader";

import StudentSessionOverview from "@/components/admin/academic/sections/session/studentSessionOverview";

import StudentSessionProgression from "@/components/admin/academic/sections/session/studentSessionProgression";

import StudentSessionViolations from "@/components/admin/academic/sections/session/studentSessionViolations";

import StudentSessionTimeline from "@/components/admin/academic/sections/session/studentSessionTimeline";

import StudentSessionActions from "@/components/admin/academic/sections/session/studentSessionActions";

export default function StudentSessionPage() {
  const params = useParams();

  return (
    <PageContainer>
      {/* HEADER */}

      <StudentSessionHeader
        sectionId={String(params.id)}
        examId={String(params.examId)}
      />

      {/* TOP GRID */}

      <div
        className="
          grid
          gap-6
          xl:grid-cols-2
        "
      >
        <StudentSessionOverview />

        <StudentSessionProgression />
      </div>

      {/* TIMELINE + VIOLATIONS */}

      <div
        className="
          grid
          gap-6
          xl:grid-cols-[1.4fr_0.8fr]
        "
      >
        <StudentSessionTimeline />

        <StudentSessionViolations />
      </div>

      {/* ACTIONS */}

      <StudentSessionActions />
    </PageContainer>
  );
}
