"use client";

import { useEffect, useState } from "react";
import MotionButton from "@/components/motion/motionButton";
import SectionsGrid from "./sectionsGrid";
import { getSections } from "@/services/academic_service";
import CreateSectionModal from "./createSectionModal";
import type { Section } from "@/types/section";
import Pagination from "@/components/common/pagination";
import BackButton from "@/components/common/backButton";

export default function SectionsDashboard() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const data = await getSections();

        setSections(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  const totalPages = Math.ceil(
    sections.length / ITEMS_PER_PAGE
  );

  const paginatedSections = sections.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,

    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div>
          <h2
            className="
              text-2xl
              font-semibold
              text-foreground
            "
          >
            Sections
          </h2>

          <p className="mt-1 text-muted-foreground">
            Manage academic sections and student groupings.
          </p>
        </div>

        <MotionButton
          onClick={() => setOpenModal(true)}
          className="
            rounded-xl
            bg-primary
            px-4
            py-2
            text-sm
            font-medium
            text-primary-foreground
            transition
            hover:bg-primary/90
          "
        >
          Create Section
        </MotionButton>
      </div>
      <CreateSectionModal
        open={openModal}
        onOpenChange={setOpenModal}
        onSuccess={async () => {
          const data = await getSections();

          setSections(data);
        }}
      />

      {/* CONTENT */}

      {loading ? (
        <div
          className="
            rounded-2xl
            bg-card
            p-10
            text-center
            text-muted-foreground
          "
        >
          Loading sections...
        </div>
      ) : (
        <>
          <SectionsGrid sections={paginatedSections} />

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
