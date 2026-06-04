"use client";

import { memo, useState } from "react";

import MotionModal from "@/components/motion/motionModal";

import ModalHeader from "@/components/common/modal/modalHeader";

import ModalActions from "@/components/common/modal/modalActions";

import SectionFormFields from "./sectionFormFields";

import { successToast, errorToast } from "@/lib/swal";

import { createSection } from "@/services/academic_service";

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  onSuccess: () => Promise<void> | void;
}

function CreateSectionModal({
  open,
  onOpenChange,
  onSuccess,
}: Props) {
  const [sectionCode, setSectionCode] = useState("");

  const [yearLevel, setYearLevel] = useState(1);

  const [program, setProgram] = useState("BSN");

  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setSectionCode("");

    setYearLevel(1);

    setProgram("BSN");
  };

  const handleClose = () => {
    if (loading) return;

    onOpenChange(false);
  };

  const handleSubmit = async () => {
    if (loading) return;

    const trimmedSectionCode = sectionCode.trim();

    if (!trimmedSectionCode) {
      errorToast("Section code is required.");

      return;
    }

    try {
      setLoading(true);

      await createSection({
        sectionCode: trimmedSectionCode,
        yearLevel,
        program,
      });

      successToast("Section created successfully.");

      await onSuccess();

      resetForm();

      onOpenChange(false);
    } catch (error: any) {
      errorToast(
        error?.response?.data?.message ||
          "Failed to create section."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <MotionModal open={open}>
      <div className="p-6">
        <ModalHeader
          title="Create Section"
          description="Create a structured academic section."
          onClose={handleClose}
        />

        <SectionFormFields
          sectionCode={sectionCode}
          setSectionCode={setSectionCode}
          yearLevel={yearLevel}
          setYearLevel={setYearLevel}
          program={program}
          setProgram={setProgram}
        />

        <ModalActions
          submitLabel={
            loading ? "Creating..." : "Create Section"
          }
          submitDisabled={loading || !sectionCode.trim()}
          onCancel={handleClose}
          onSubmit={handleSubmit}
        />
      </div>
    </MotionModal>
  );
}

export default memo(CreateSectionModal);
