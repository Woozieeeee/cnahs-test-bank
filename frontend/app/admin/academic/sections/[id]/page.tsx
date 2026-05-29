"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { getSectionById } from "@/services/academic_service";

import type { Section } from "@/types/section";

import SectionDetailsHeader from "@/components/admin/academic/sections/details/sectionDetailsHeader";

import SectionSubjectsPreview from "@/components/admin/academic/sections/details/sectionSubjectsPreview";

import SectionStudentsPreview from "@/components/admin/academic/sections/details/sectionStudentsPreview";

import SectionExamsPreview from "@/components/admin/academic/sections/details/sectionExamsPreview";

import PageContainer from "@/components/layout/pages/pageContainer";

export default function SectionDetailsPage() {
  const params = useParams();

  const id = Number(params.id);

  const [section, setSection] = useState<Section | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchSection = async () => {
      try {
        const data = await getSectionById(id);

        setSection(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSection();
  }, [id]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return <div className="p-6">Loading section...</div>;
  }

  // =========================
  // NOT FOUND
  // =========================

  if (!section) {
    return <div className="p-6">Section not found.</div>;
  }

  return (
    <PageContainer>
      <SectionDetailsHeader section={section} />

      <div
        className="
          grid
          gap-6
          xl:grid-cols-3
          items-stretch
        "
      >
        <SectionSubjectsPreview section={section} />

        <SectionStudentsPreview section={section} />

        <SectionExamsPreview section={section} />
      </div>
    </PageContainer>
  );
}
