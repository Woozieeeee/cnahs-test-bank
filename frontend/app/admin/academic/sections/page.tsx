"use client";

import { useEffect, useState } from "react";

import { getSections } from "@/services/academic_service";

import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import SectionCard from "@/components/admin/academic/sections/sectionCard";

import CreateSectionModal from "@/components/admin/academic/sections/createSectionModal";

import MotionButton from "@/components/motion/motionButton";

import type { Section } from "@/types/section";

import BackButton from "@/components/common/backButton";

export default function SectionsPage() {
  const [sections, setSections] = useState<Section[]>([]);

  const [loading, setLoading] = useState(true);

  const [openCreateModal, setOpenCreateModal] =
    useState(false);

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

  // =========================
  // FETCH SECTIONS
  // =========================

  useEffect(() => {
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
        <div className="space-y-4">
          <BackButton
            href="/admin/academic"
            label="Back to Academic Management"
          />

          <div>
            <h1
              className="
        text-3xl
        font-bold
        text-foreground
      "
            >
              Sections
            </h1>

            <p className="mt-2 text-muted-foreground">
              Manage academic sections and classrooms.
            </p>
          </div>
        </div>

        <MotionButton
          onClick={() => setOpenCreateModal(true)}
          className="
            rounded-xl
            bg-card
            px-4
            py-2
            font-medium
            text-foreground
            transition
            hover:bg-foreground
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
    border-border
    bg-card
    p-10
    text-center
    text-muted-foreground
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
        onSuccess={fetchSections}
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
