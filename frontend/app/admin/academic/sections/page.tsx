"use client";

import { useEffect, useState } from "react";

import { getSections } from "@/services/academic_service";

import SectionCard from "@/components/admin/academic/sections/sectionCard";

import CreateSectionModal from "@/components/admin/academic/sections/createSectionModal";

import MotionButton from "@/components/motion/motionButton";

import type { Section } from "@/types/section";

export default function SectionsPage() {
  const [sections, setSections] = useState<Section[]>([]);

  const [loading, setLoading] = useState(true);

  const [openCreateModal, setOpenCreateModal] =
    useState(false);

  // =========================
  // FETCH SECTIONS
  // =========================

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

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return <div>Loading sections...</div>;
  }

  return (
    <div className="space-y-6">
      {/* ACTIONS */}

      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>
          <h2
            className="
              text-xl
              font-semibold
              text-slate-900
            "
          >
            Sections
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage academic sections and classrooms.
          </p>
        </div>

        <MotionButton
          onClick={() => setOpenCreateModal(true)}
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
          label="Total Sections"
          value={sections.length}
        />

        <StatCard
          label="Total Students"
          value={sections.reduce(
            (total, section) =>
              total + section.users.length,
            0
          )}
        />

        <StatCard
          label="Total Exams"
          value={sections.reduce(
            (total, section) =>
              total + section.exams.length,
            0
          )}
        />

        <StatCard
          label="Programs"
          value={
            new Set(
              sections.map((section) => section.program)
            ).size
          }
        />
      </div>

      {/* GRID */}

      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {sections.length === 0 ? (
          <div
            className="
              col-span-full
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
            No sections created yet.
          </div>
        ) : (
          sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
            />
          ))
        )}
      </div>

      {/* MODAL */}

      <CreateSectionModal
        open={openCreateModal}
        onOpenChange={setOpenCreateModal}
        onSuccess={() => {
          window.location.reload();
        }}
      />
    </div>
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
