"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { getSectionById } from "@/services/academic_service";

import type { Section } from "@/types/section";

import PageContainer from "@/components/layout/pages/pageContainer";

import SectionExamsHeader from "@/components/admin/academic/sections/exams/sectionExamsHeader";

import SectionExamsList from "@/components/admin/academic/sections/exams/sectionExamsList";

import { mockSectionExams } from "@/components/admin/academic/sections/data/mockSectionsExam";

export default function SectionExamsPage() {
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

  if (loading) {
    return <div className="p-6">Loading exams...</div>;
  }

  if (!section) {
    return <div className="p-6">Section not found.</div>;
  }

  const exams =
    section.exams.length > 0
      ? section.exams
      : mockSectionExams;

  return (
    <PageContainer>
      <SectionExamsHeader
        sectionId={id}
        sectionName={section.name}
      />

      <SectionExamsList exams={exams} sectionId={id} />
    </PageContainer>
  );
}
