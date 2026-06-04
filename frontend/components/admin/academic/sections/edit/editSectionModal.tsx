"use client";

import { memo, useEffect, useState } from "react";

import MotionModal from "@/components/motion/motionModal";

import ModalHeader from "@/components/common/modal/modalHeader";

import ModalActions from "@/components/common/modal/modalActions";

import { updateSection } from "@/services/academic_service";

import { successToast, errorToast } from "@/lib/swal";

import type { Section } from "@/types/section";

import EditSectionForm from "./editSectionForm";

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  section: Section | null;

  onSuccess: () => Promise<void> | void;
}

function EditSectionModal({
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
  // CLOSE
  // =========================

  const handleClose = () => {
    if (loading) return;

    onOpenChange(false);
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async () => {
    if (!section || loading) return;

    const trimmedSectionCode = sectionCode.trim();

    if (!trimmedSectionCode) {
      errorToast("Section code is required.");

      return;
    }

    try {
      setLoading(true);

      await updateSection(section.id, {
        program,
        yearLevel,
        sectionCode: trimmedSectionCode,
      });

      successToast("Section updated successfully.");

      await onSuccess();

      onOpenChange(false);
    } catch (error: any) {
      errorToast(
        error?.response?.data?.message ||
          "Failed to update section."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open || !section) return null;

  return (
    <MotionModal open={open}>
      <div className="p-6">
        <ModalHeader
          title="Edit Section"
          description="Update section information."
          onClose={handleClose}
        />

        <EditSectionForm
          sectionCode={sectionCode}
          setSectionCode={setSectionCode}
          yearLevel={yearLevel}
          setYearLevel={setYearLevel}
          program={program}
          setProgram={setProgram}
        />

        <ModalActions
          submitLabel={
            loading ? "Saving..." : "Save Changes"
          }
          submitDisabled={loading || !sectionCode.trim()}
          onCancel={handleClose}
          onSubmit={handleSubmit}
        />
      </div>
    </MotionModal>
  );
}

export default memo(EditSectionModal);
