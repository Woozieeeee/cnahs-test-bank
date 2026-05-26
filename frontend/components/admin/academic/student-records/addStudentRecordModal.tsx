"use client";

import { useState } from "react";
import MotionButton from "@/components/motion/motionButton";
import StudentRecordFormFields from "./studentRecordFormFields";
import { successToast, errorToast } from "@/lib/swal";
import MotionModal from "@/components/motion/motionModal";

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  onSuccess: () => void;
}

export default function AddStudentRecordModal({
  open,

  onOpenChange,

  onSuccess,
}: Props) {
  const [studentId, setStudentId] = useState("");

  const [fullName, setFullName] = useState("");

  const [program, setProgram] = useState("BSN");

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  // =========================
  // HANDLE SUBMIT
  // =========================

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // TEMPORARY

      console.log({
        studentId,

        fullName,

        program,
      });

      successToast("Student record created successfully.");

      onSuccess();

      onOpenChange(false);

      // RESET FORM

      setStudentId("");

      setFullName("");

      setProgram("BSN");
    } catch (error: any) {
      errorToast(
        error?.response?.data?.message ||
          "Failed to create student record."
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
              text-slate-900
            "
            >
              Add Student Record
            </h2>

            <p
              className="
              mt-1
              text-sm
              text-slate-500
            "
            >
              Create a student verification record.
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

        <StudentRecordFormFields
          studentId={studentId}
          setStudentId={setStudentId}
          fullName={fullName}
          setFullName={setFullName}
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
            {loading ? "Creating..." : "Create Record"}
          </MotionButton>
        </div>
      </div>
    </MotionModal>
  );
}
