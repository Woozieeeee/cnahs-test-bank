"use client";

import { useState } from "react";
import MotionButton from "@/components/motion/motionButton";
import StudentRecordFormFields from "./studentRecordFormFields";
import { successToast, errorToast } from "@/lib/swal";
import MotionModal from "@/components/motion/motionModal";
import { createStudentRecord } from "@/services/academic_service";
import { formatName } from "@/utils/format_name";

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

  const [firstName, setFirstName] = useState("");

  const [middleName, setMiddleName] = useState("");

  const [lastName, setLastName] = useState("");

  const [suffix, setSuffix] = useState("");

  const [program, setProgram] = useState("BSN");

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  // =========================
  // HANDLE SUBMIT
  // =========================

  const handleSubmit = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      errorToast("First name and last name are required.");

      return;
    }
    const formattedFirstName = formatName(firstName);

    const formattedMiddleName = formatName(middleName);

    const formattedLastName = formatName(lastName);

    const formattedSuffix = formatName(suffix);

    try {
      setLoading(true);

      await createStudentRecord({
        studentId,

        firstName: formattedFirstName,

        middleName: formattedMiddleName,

        lastName: formattedLastName,

        suffix: formattedSuffix,

        program,
      });

      successToast("Student record created successfully.");

      onSuccess();

      onOpenChange(false);

      // RESET FORM

      setStudentId("");

      setFirstName("");

      setMiddleName("");

      setLastName("");

      setSuffix("");

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
              text-card-foreground
            "
            >
              Add Student Record
            </h2>

            <p
              className="
              mt-1
              text-sm
              text-muted-foreground
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
            text-muted-foreground
            transition
            hover:bg-muted
          "
          >
            ✕
          </button>
        </div>

        {/* FORM */}

        <StudentRecordFormFields
          studentId={studentId}
          setStudentId={setStudentId}
          firstName={firstName}
          setFirstName={setFirstName}
          middleName={middleName}
          setMiddleName={setMiddleName}
          lastName={lastName}
          setLastName={setLastName}
          suffix={suffix}
          setSuffix={setSuffix}
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
            px-4
            py-2
            text-sm
            font-medium
            text-foreground
          "
          >
            Cancel
          </MotionButton>

          <MotionButton
            onClick={handleSubmit}
            className="
            rounded-xl
            bg-primary
            px-4
            py-2
            text-sm
            font-medium
            text-primary-foreground
            transition
            hover:bg-primary/90
          "
          >
            {loading ? "Creating..." : "Create Record"}
          </MotionButton>
        </div>
      </div>
    </MotionModal>
  );
}
