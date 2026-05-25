"use client";

import { useEffect, useState } from "react";

import { getSectionById } from "@/services/academic_service";

import type { Section } from "@/types/section";

interface Props {
  params: {
    id: string;
  };
}

export default function SectionDetailsPage({
  params,
}: Props) {
  const [section, setSection] = useState<Section | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const data = await getSectionById(
          Number(params.id)
        );

        setSection(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSection();
  }, [params.id]);

  if (loading) {
    return <div className="p-6">Loading section...</div>;
  }

  if (!section) {
    return <div className="p-6">Section not found.</div>;
  }

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}

      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-slate-900
          "
        >
          {section.name}
        </h1>

        <p className="mt-2 text-slate-500">
          {section.program} • Year {section.yearLevel}
        </p>
      </div>

      {/* STATS */}

      <div
        className="
          grid
          gap-4
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        <StatCard
          label="Students"
          value={section.users.length}
        />

        <StatCard
          label="Subjects"
          value={section.sectionSubjects.length}
        />

        <StatCard
          label="Exams"
          value={section.exams.length}
        />

        <StatCard label="Violations" value={0} />
      </div>

      {/* TABS PLACEHOLDER */}

      <div
        className="
          rounded-2xl
          border
          border-dashed
          border-slate-200
          bg-white
          p-10
          text-center
          text-slate-500
        "
      >
        Section monitoring tabs coming soon.
      </div>
    </div>
  );
}

function StatCard({
  label,

  value,
}: {
  label: string;

  value: number;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
      "
    >
      <p className="text-sm text-slate-500">{label}</p>

      <h2
        className="
          mt-2
          text-3xl
          font-bold
          text-slate-900
        "
      >
        {value}
      </h2>
    </div>
  );
}
