"use client";

import dynamic from "next/dynamic";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import MotionButton from "@/components/motion/motionButton";

import SectionsGrid from "./sectionsGrid";

import { getSections } from "@/services/academic_service";

import type { Section } from "@/types/section";

import Pagination from "@/components/common/pagination";

const CreateSectionModal = dynamic(
  () => import("./createSectionModal"),
  {
    ssr: false,
  }
);

function SectionsDashboard() {
  const [sections, setSections] = useState<Section[]>([]);

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;

  // =========================
  // FETCH
  // =========================

  const fetchSections = useCallback(async () => {
    try {
      const data = await getSections();

      setSections(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  // =========================
  // PAGINATION
  // =========================

  const totalPages = useMemo(() => {
    return Math.ceil(sections.length / ITEMS_PER_PAGE);
  }, [sections.length]);

  const paginatedSections = useMemo(() => {
    return sections.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }, [sections, currentPage]);

  // =========================
  // REFRESH
  // =========================

  const handleRefresh = useCallback(async () => {
    const data = await getSections();

    setSections(data);
  }, []);

  const handleSectionCreated = useCallback((section: Section) => {
    setSections((current) => [section, ...current]);
  }, []);

  const handleSectionArchiveSuccess = useCallback(
    (sectionId: number) => {
      setSections((current) =>
        current.map((section) =>
          section.id === sectionId
            ? { ...section, isArchived: true }
            : section
        )
      );
    },
    []
  );

  const handleSectionRestoreSuccess = useCallback(
    (sectionId: number) => {
      setSections((current) =>
        current.map((section) =>
          section.id === sectionId
            ? { ...section, isArchived: false }
            : section
        )
      );
    },
    []
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-foreground text-2xl font-semibold">
            Sections
          </h2>

          <p className="text-muted-foreground mt-1">
            Manage academic sections and student groupings.
          </p>
        </div>

        <MotionButton
          onClick={() => setOpenModal(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200"
        >
          Create Section
        </MotionButton>
      </div>

      {/* MODAL */}

      <CreateSectionModal
        open={openModal}
        onOpenChange={setOpenModal}
        onSuccess={handleSectionCreated}
      />

      {/* CONTENT */}

      {loading ? (
        <div className="bg-card text-muted-foreground rounded-2xl p-10 text-center">
          Loading sections...
        </div>
      ) : (
        <>
          <SectionsGrid
            sections={paginatedSections}
            onArchiveSuccess={handleSectionArchiveSuccess}
            onRestoreSuccess={handleSectionRestoreSuccess}
            onEdit={(section) => {
              console.log("Edit:", section);
            }}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default memo(SectionsDashboard);
