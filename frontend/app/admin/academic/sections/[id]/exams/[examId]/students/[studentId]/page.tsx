"use client";

import { useParams } from "next/navigation";

import PageContainer from "@/components/layout/pages/pageContainer";

import StudentSessionHeader from "@/components/admin/academic/sections/session/studentSessionHeader";

import StudentSessionStats from "@/components/admin/academic/sections/session/studentSessionStats";

import StudentSessionProgression from "@/components/admin/academic/sections/session/studentSessionProgression";

import StudentSessionViolations from "@/components/admin/academic/sections/session/studentSessionViolations";

export default function StudentSessionPage() {
  const params = useParams();

  return (
    <PageContainer>
      {/* HEADER */}

      <StudentSessionHeader
        sectionId={String(params.id)}
        examId={String(params.examId)}
      />

      {/* SESSION STATS */}

      <StudentSessionStats />

      {/* MAIN CONTENT */}

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        {/* PROGRESSION */}

        <StudentSessionProgression />

        {/* VIOLATIONS */}

        <StudentSessionViolations />
      </div>
    </PageContainer>
  );
}
