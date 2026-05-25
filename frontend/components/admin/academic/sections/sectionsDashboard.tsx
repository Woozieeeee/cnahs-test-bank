"use client";

import { useEffect, useState } from "react";
import MotionButton from "@/components/motion/motionButton";
import SectionsGrid from "./sectionsGrid";
import { getSections } from "@/services/academic_service";
import CreateSectionModal from "./createSectionModal";
import type { Section } from "@/types/section";

export default function SectionsDashboard() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

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
              text-slate-900
            "
          >
            Sections
          </h2>

          <p className="mt-1 text-slate-500">
            Manage academic sections and student groupings.
          </p>
        </div>

        <MotionButton
          onClick={() => setOpenModal(true)}
          className="
            rounded-xl
            bg-slate-900
            px-4
            py-2
            text-sm
            font-medium
            text-white
            transition
            hover:bg-slate-800
          "
        >
          Create Section
        </MotionButton>
      </div>
      <CreateSectionModal
        open={openModal}
        onClose={() => setOpenModal(false)}
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
            bg-white
            p-10
            text-center
            text-slate-500
          "
        >
          Loading sections...
        </div>
      ) : (
        <SectionsGrid sections={sections} />
      )}
    </div>
  );
}
