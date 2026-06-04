"use client";

import {
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";

import MotionModal from "@/components/motion/motionModal";

import MotionButton from "@/components/motion/motionButton";

import { successToast, errorToast } from "@/lib/swal";

import StudentRecordFormFields from "./studentRecordFormFields";

import { updateStudentRecord } from "@/services/academic_service";

import { formatName } from "@/utils/format_name";

interface StudentRecord {
  id: number;

  studentId: string;

  firstName: string;

  middleName?: string;

  lastName: string;

  suffix?: string;

  program: string;
}

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  onSuccess: () => void;

  record: StudentRecord | null;
}

function EditStudentRecordModal({
  open,
  onOpenChange,
  onSuccess,
  record,
}: Props) {
  const [studentId, setStudentId] = useState("");

  const [firstName, setFirstName] = useState("");

  const [middleName, setMiddleName] = useState("");

  const [lastName, setLastName] = useState("");

  const [suffix, setSuffix] = useState("");

  const [program, setProgram] = useState("BSN");

  const [loading, setLoading] = useState(false);

  // =========================
  // PREFILL FORM
  // =========================

  useEffect(() => {
    if (!record) return;

    setStudentId(record.studentId);

    setFirstName(record.firstName);

    setMiddleName(record.middleName || "");

    setLastName(record.lastName);

    setSuffix(record.suffix || "");

    setProgram(record.program);
  }, [record]);

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = useCallback(async () => {
    if (!record) return;

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

      await updateStudentRecord(record.id, {
        studentId,

        firstName: formattedFirstName,

        middleName: formattedMiddleName,

        lastName: formattedLastName,

        suffix: formattedSuffix,

        program,
      });

      successToast("Student record updated successfully.");

      onSuccess();

      onOpenChange(false);
    } catch (error: unknown) {
      const responseError = error as {
        response?: { data?: { message?: string } };
      };

      errorToast(
        responseError.response?.data?.message ||
          "Failed to update student record."
      );
    } finally {
      setLoading(false);
    }
  }, [
    record,
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
    <MotionModal open={open} maxWidth="max-w-5xl" contentClassName="max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        {/* HEADER */}

        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-card-foreground text-2xl font-bold">
              Edit Student Record
            </h2>

            <p className="text-muted-foreground mt-1 text-sm">
              Update student information.
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
            className="border-border text-foreground cursor-pointer rounded-xl border px-4 py-2 text-sm font-medium"
          >
            Cancel
          </MotionButton>

          <MotionButton
            onClick={handleSubmit}
            disabled={loading}
            className="bg-primary text-primary-foreground hover:bg-primary/80 cursor-pointer rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 disabled:opacity-70"
          >
            {loading ? "Saving..." : "Save Changes"}
          </MotionButton>
        </div>
      </div>
    </MotionModal>
  );
}

export default memo(EditStudentRecordModal);
