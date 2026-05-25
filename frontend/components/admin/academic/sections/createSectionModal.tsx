"use client";

import { useState } from "react";

import MotionButton from "@/components/motion/motionButton";

import { successToast, errorToast } from "@/lib/swal";

import { createSection } from "@/services/academic_service";

interface Props {
  open: boolean;

  onClose: () => void;

  onSuccess: () => void;
}

export default function CreateSectionModal({
  open,

  onClose,

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

      onClose();

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
            onClick={onClose}
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

        <div className="mt-6 space-y-4">
          <div>
            <label
              className="
                text-sm
                font-medium
                text-slate-700
              "
            >
              Section Name
            </label>

            <input
              type="text"
              placeholder="Nursing 4A"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                mt-2
                w-full
                rounded-xl
                border
                border-slate-200
                px-4
                py-3
                outline-none
                transition
                focus:border-slate-400
              "
            />
          </div>

          <div>
            <label
              className="
                text-sm
                font-medium
                text-slate-700
              "
            >
              Year Level
            </label>

            <select
              value={yearLevel}
              onChange={(e) =>
                setYearLevel(Number(e.target.value))
              }
              className="
                mt-2
                w-full
                rounded-xl
                border
                border-slate-200
                px-4
                py-3
              "
            >
              <option value={1}>1st Year</option>

              <option value={2}>2nd Year</option>

              <option value={3}>3rd Year</option>

              <option value={4}>4th Year</option>
            </select>
          </div>

          <div>
            <label
              className="
                text-sm
                font-medium
                text-slate-700
              "
            >
              Program
            </label>

            <input
              type="text"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className="
                mt-2
                w-full
                rounded-xl
                border
                border-slate-200
                px-4
                py-3
                outline-none
                transition
                focus:border-slate-400
              "
            />
          </div>
        </div>

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
            onClick={onClose}
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
