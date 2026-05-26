"use client";

import { useState } from "react";

import MotionButton from "@/components/motion/motionButton";

import { successToast, errorToast } from "@/lib/swal";

import { createSection } from "@/services/academic_service";

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
  const [name, setName] = useState("");

  const [yearLevel, setYearLevel] = useState(1);

  const [program, setProgram] = useState("BSN");

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await createSection({
        name,

        yearLevel,

        program,
      });

      successToast("Section created successfully.");

      onSuccess();

      onOpenChange(false);

      setName("");

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
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          bg-white
          p-6
          shadow-xl
        "
      >
        {/* HEADER */}

        <div className="flex items-start justify-between">
          <div>
            <h2
              className="
                text-2xl
                font-bold
                text-slate-900
              "
            >
              Create Section
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Create a new academic section.
            </p>
          </div>

          <button
            onClick={() => onOpenChange(false)}
            className="
              rounded-lg
              px-3
              py-1
              text-slate-500
              transition
              hover:bg-slate-100
            "
          >
            ✕
          </button>
        </div>

        {/* FORM */}

        <SectionFormFields
          name={name}
          setName={setName}
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
              border-slate-200
              px-4
              py-2
              text-sm
              font-medium
              text-slate-700
            "
          >
            Cancel
          </MotionButton>

          <MotionButton
            onClick={handleSubmit}
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
            {loading ? "Creating..." : "Create Section"}
          </MotionButton>
        </div>
      </div>
    </div>
  );
}
