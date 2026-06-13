"use client";

import { useMemo, useState } from "react";

import dynamic from "next/dynamic";

import type { Section } from "@/types/academic/section";

import useSections from "@/hooks/academic/useSections";

import PageContainer from "@/components/layout/pages/pageContainer";

import LoadingState from "@/components/common/states/loadingState";

import ErrorState from "@/components/common/states/errorState";

import SectionsHeader from "@/components/admin/academic/sections/sectionsHeader";

import SectionsStats from "@/components/admin/academic/sections/sectionsStats";

import SectionsGrid from "@/components/admin/academic/sections/sectionsGrid";

import EditSectionModal from "@/components/admin/academic/sections/edit/editSectionModal";

import ManageStudentsModal from "@/components/admin/academic/sections/manage/manageStudentsModal";

const CreateSectionModal = dynamic(
  () =>
    import("@/components/admin/academic/sections/createSectionModal"),
  {
    ssr: false,
  }
);

export default function SectionsPage() {
  const { sections, setSections, loading, error, refresh } =
    useSections();

  const [activeTab, setActiveTab] = useState("ALL");

  const [openCreateModal, setOpenCreateModal] =
    useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);

  const [selectedSection, setSelectedSection] =
    useState<Section | null>(null);

  const [openManageStudentsModal, setOpenManageStudentsModal] =
    useState(false);

  const handleSectionCreated = (section: Section) => {
    setSections((current) => [section, ...current]);
    setOpenCreateModal(false);
  };

  const handleSectionUpdated = (
    updatedSection: Section
  ) => {
    setSections((current) =>
      current.map((section) =>
        section.id === updatedSection.id
          ? updatedSection
          : section
      )
    );
    setSelectedSection(null);
    setOpenEditModal(false);
  };

  const handleSectionArchiveSuccess = (
    sectionId: number
  ) => {
    setSections((current) =>
      current.map((section) =>
        section.id === sectionId
          ? { ...section, isArchived: true }
          : section
      )
    );
  };

  const handleSectionRestoreSuccess = (
    sectionId: number
  ) => {
    setSections((current) =>
      current.map((section) =>
        section.id === sectionId
          ? { ...section, isArchived: false }
          : section
      )
    );
  };

  // =========================
  // FILTERS
  // =========================

  const filteredSections = useMemo(() => {
    switch (activeTab) {
      case "ACTIVE":
        return sections.filter(
          (section) => !section.isArchived
        );

      case "ARCHIVED":
        return sections.filter(
          (section) => section.isArchived
        );

      default:
        return sections;
    }
  }, [sections, activeTab]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading sections..."
          description="Please wait while we retrieve section data."
        />
      </PageContainer>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load sections."
          description={error}
          onRetry={refresh}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* HEADER */}

      <SectionsHeader
        onCreate={() => setOpenCreateModal(true)}
      />

      {/* STATS */}

      <SectionsStats sections={sections} />

      {/* GRID */}

      <SectionsGrid
        sections={filteredSections}
        onArchiveSuccess={handleSectionArchiveSuccess}
        onRestoreSuccess={handleSectionRestoreSuccess}
        onEdit={(section) => {
          setSelectedSection(section);

          setOpenEditModal(true);
        }}
        onManageStudents={(section) => {
          setSelectedSection(section);

          setOpenManageStudentsModal(true);
        }}
      />

      {/* CREATE */}

      <CreateSectionModal
        open={openCreateModal}
        onOpenChange={setOpenCreateModal}
        onSuccess={handleSectionCreated}
      />

      {/* EDIT */}

      <EditSectionModal
        open={openEditModal}
        onOpenChange={setOpenEditModal}
        section={selectedSection}
        onSuccess={handleSectionUpdated}
      />

      {/* MANAGE STUDENTS */}

      <ManageStudentsModal
        open={openManageStudentsModal}
        onOpenChange={setOpenManageStudentsModal}
        section={selectedSection}
        onSuccess={refresh}
      />
    </PageContainer>
  );
}
