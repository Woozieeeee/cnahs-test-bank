"use client";

import { useEffect, useState } from "react";

import MotionModal from "@/components/motion/motionModal";

import MotionButton from "@/components/motion/motionButton";

import { successToast, errorToast } from "@/lib/swal";

import StudentRecordFormFields from "./studentRecordFormFields";

interface StudentRecord {
  id: number;

  studentId: string;

  fullName: string;

  program: string;
}

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  onSuccess: () => void;

  record: StudentRecord | null;
}

export default function EditStudentRecordModal({
  open,

  onOpenChange,

  onSuccess,

  record,
}: Props) {
  const [studentId, setStudentId] = useState("");

  const [fullName, setFullName] = useState("");

  const [program, setProgram] = useState("BSN");

  const [loading, setLoading] = useState(false);

  // =========================
  // PREFILL FORM
  // =========================

  useEffect(() => {
    if (record) {
      setStudentId(record.studentId);

      setFullName(record.fullName);

      setProgram(record.program);
    }
  }, [record]);

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // TEMPORARY

      console.log({
        id: record?.id,

        studentId,

        fullName,

        program,
      });

      successToast("Student record updated successfully.");

      onSuccess();

      onOpenChange(false);
    } catch (error: any) {
      errorToast(
        error?.response?.data?.message ||
          "Failed to update student record."
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
              Edit Student Record
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Update student information.
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
            disabled={loading}
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
              disabled:opacity-70
            "
          >
            {loading ? "Saving..." : "Save Changes"}
          </MotionButton>
        </div>
      </div>
    </MotionModal>
  );
}
