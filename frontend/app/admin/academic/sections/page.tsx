"use client";

import { useEffect, useState } from "react";
import { getSections } from "@/services/academic_service";
import SectionCard from "@/components/admin/academic/sections/sectionCard";
import CreateSectionModal from "@/components/admin/academic/sections/createSectionModal";
import MotionButton from "@/components/motion/motionButton";
import type { Section } from "@/types/section";
import BackButton from "@/components/common/backButton";
import SectionsHeader from "@/components/admin/academic/sections/sectionsHeader";
import SectionsTabs from "@/components/admin/academic/sections/sectionTabs";
import SectionsStats from "@/components/admin/academic/sections/sectionsStats";
import SectionsGrid from "@/components/admin/academic/sections/sectionsGrid";
import EditSectionModal from "@/components/admin/academic/sections/edit/editSectionModal";
import PageContainer from "@/components/layout/pages/pageContainer";

export default function SectionsPage() {
  const [sections, setSections] = useState<Section[]>([]);

  const [initialLoading, setInitialLoading] =
    useState(true);

  const [openCreateModal, setOpenCreateModal] =
    useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);

  const [selectedSection, setSelectedSection] =
    useState<Section | null>(null);

  const [activeTab, setActiveTab] = useState("ALL");

  const fetchSections = async () => {
    try {
      const data = await getSections();

      setSections(data);
    } catch (error) {
      console.log(error);
    } finally {
      setInitialLoading(false);
    }
  };

  const filteredSections =
    activeTab === "ACTIVE"
      ? sections.filter((section) => !section.isArchived)
      : activeTab === "ARCHIVED"
        ? sections.filter((section) => section.isArchived)
        : sections;

  // =========================
  // FETCH SECTIONS
  // =========================

  useEffect(() => {
    fetchSections();
  }, []);

  // =========================
  // LOADING
  // =========================

  if (initialLoading) {
    return <div>Loading sections...</div>;
  }

  return (
    <PageContainer>
      <SectionsHeader
        onCreate={() => setOpenCreateModal(true)}
      />

      <SectionsTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <SectionsStats sections={sections} />

      <SectionsGrid
        sections={filteredSections}
        onRefresh={fetchSections}
        onEdit={(section) => {
          setSelectedSection(section);

          setOpenEditModal(true);
        }}
      />

      <CreateSectionModal
        open={openCreateModal}
        onOpenChange={setOpenCreateModal}
        onSuccess={fetchSections}
      />

      <EditSectionModal
        open={openEditModal}
        onOpenChange={setOpenEditModal}
        section={selectedSection}
        onSuccess={fetchSections}
      />
    </PageContainer>
  );
}

// =========================
// STAT CARD
// =========================

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
        border-border
        bg-card
        p-6
      "
    >
      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <h2
        className="
          mt-2
          text-3xl
          font-bold
          text-foreground
        "
      >
        {value}
      </h2>
    </div>
  );
}
