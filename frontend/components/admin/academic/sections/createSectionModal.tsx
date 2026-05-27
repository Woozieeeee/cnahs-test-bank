"use client";

import { useState } from "react";
import MotionButton from "@/components/motion/motionButton";
import { successToast, errorToast } from "@/lib/swal";
import { createSection } from "@/services/academic_service";
import MotionModal from "@/components/motion/motionModal";
import SectionFormFields from "./sectionFormFields";

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  onSuccess: () => void;
}

export default function CreateSectionModal({
  open,

  onOpenChange,

  onSuccess,
}: Props) {
  const [sectionCode, setSectionCode] = useState("");

  const [yearLevel, setYearLevel] = useState(1);

  const [program, setProgram] = useState("BSN");

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  // =========================
  // HANDLE SUBMIT
  // =========================

  const handleSubmit = async () => {
    try {
      if (!sectionCode) {
        errorToast("Section code is required.");

        return;
      }

      setLoading(true);

      await createSection({
        sectionCode,

        yearLevel,

        program,
      });

      successToast("Section created successfully.");

      onSuccess();

      onOpenChange(false);

      // RESET FORM

      setSectionCode("");

      setYearLevel(1);

      setProgram("BSN");
    } catch (error: any) {
      errorToast(
        error?.response?.data?.message ||
          "Failed to create section."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionModal open={open}>
      <div className="p-6">
        {/* HEADER */}

        <div
          className="
            flex
            items-start
            justify-between
          "
        >
          <div>
            <h2
              className="
                text-2xl
                font-bold
                text-foreground
              "
            >
              Create Section
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-muted-foreground
              "
            >
              Create a structured academic section.
            </p>
          </div>

          <button
            onClick={() => onOpenChange(false)}
            className="
              rounded-lg
              px-3
              py-1
              text-muted-foreground
              transition
              hover:bg-muted
            "
          >
            ✕
          </button>
        </div>

        {/* FORM */}

        <SectionFormFields
          sectionCode={sectionCode}
          setSectionCode={setSectionCode}
          yearLevel={yearLevel}
          setYearLevel={setYearLevel}
          program={program}
          setProgram={setProgram}
        />

        {/* ACTIONS */}

        <div
          className="
            mt-6
            flex
            justify-end
            gap-3
          "
        >
          <MotionButton
            onClick={() => onOpenChange(false)}
            className="
              rounded-xl
              border
              border-border
              bg-card
              px-4
              py-2
              text-sm
              font-medium
              text-muted-foreground
            "
          >
            Cancel
          </MotionButton>

          <MotionButton
            onClick={handleSubmit}
            className="
              rounded-xl
              bg-muted-foreground
              px-4
              py-2
              text-sm
              font-medium
              text-black
              transition
              hover:bg-foreground
            "
          >
            {loading ? "Creating..." : "Create Section"}
          </MotionButton>
        </div>
      </div>
    </MotionModal>
  );
}
