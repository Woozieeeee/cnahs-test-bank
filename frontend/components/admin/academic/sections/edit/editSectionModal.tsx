"use client";

import { useEffect, useState } from "react";

import MotionModal from "@/components/motion/motionModal";

import { updateSection } from "@/services/academic_service";

import { successToast, errorToast } from "@/lib/swal";

import type { Section } from "@/types/section";

import EditSectionForm from "./editSectionForm";

import EditSectionActions from "./editSectionActions";

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  section: Section | null;

  onSuccess: () => void;
}

export default function EditSectionModal({
  open,
  onOpenChange,
  section,
  onSuccess,
}: Props) {
  const [program, setProgram] = useState("BSN");

  const [yearLevel, setYearLevel] = useState(1);

  const [sectionCode, setSectionCode] = useState("");

  const [loading, setLoading] = useState(false);

  // =========================
  // PREFILL
  // =========================

  useEffect(() => {
    if (!section) return;

    setProgram(section.program);

    setYearLevel(section.yearLevel);

    setSectionCode(section.sectionCode);
  }, [section]);

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!section) return;

    try {
      setLoading(true);

      await updateSection(section.id, {
        program,

        yearLevel,

        sectionCode,
      });

      successToast("Section updated successfully.");

      onSuccess();

      onOpenChange(false);
    } catch (error: any) {
      errorToast(
        error.response?.data?.message ||
          "Failed to update section."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open || !section) return null;

  return (
    <MotionModal open={open}>
      <form onSubmit={handleSubmit}>
        <div className="p-6">
          {/* HEADER */}

          <div>
            <h2
              className="
                text-2xl
                font-bold
                text-foreground
              "
            >
              Edit Section
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-muted-foreground
              "
            >
              Update section information.
            </p>
          </div>

          {/* FORM */}

          <EditSectionForm
            sectionCode={sectionCode}
            setSectionCode={setSectionCode}
            yearLevel={yearLevel}
            setYearLevel={setYearLevel}
            program={program}
            setProgram={setProgram}
          />

          {/* ACTIONS */}

          <EditSectionActions
            loading={loading}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </form>
    </MotionModal>
  );
}
