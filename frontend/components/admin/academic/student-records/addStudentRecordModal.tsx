"use client";

import { memo, useCallback, useState } from "react";

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

function AddStudentRecordModal({
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

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = useCallback(async () => {
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

      // RESET

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
  }, [
    studentId,
    firstName,
    middleName,
    lastName,
    suffix,
    program,
    onSuccess,
    onOpenChange,
  ]);

  return (
    <MotionModal open={open}>
      <div className="p-6">
        {/* HEADER */}

        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-card-foreground text-2xl font-bold">
              Add Student Record
            </h2>

            <p className="text-muted-foreground mt-1 text-sm">
              Create a student verification record.
            </p>
          </div>

          <button
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:bg-muted rounded-lg px-3 py-1 transition-all duration-200"
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

        <div className="mt-6 flex justify-end gap-3">
          <MotionButton
            onClick={() => onOpenChange(false)}
            className="border-border text-foreground rounded-xl border px-4 py-2 text-sm font-medium"
          >
            Cancel
          </MotionButton>

          <MotionButton
            onClick={handleSubmit}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200"
          >
            {loading ? "Creating..." : "Create Record"}
          </MotionButton>
        </div>
      </div>
    </MotionModal>
  );
}

export default memo(AddStudentRecordModal);
