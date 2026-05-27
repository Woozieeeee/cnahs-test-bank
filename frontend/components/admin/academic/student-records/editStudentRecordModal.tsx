"use client";

import { useEffect, useState } from "react";
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

export default function EditStudentRecordModal({
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
    if (record) {
      setStudentId(record.studentId);

      setFirstName(record.firstName);

      setMiddleName(record.middleName || "");

      setLastName(record.lastName);

      setSuffix(record.suffix || "");

      setProgram(record.program);
    }
  }, [record]);

  // =========================
  // SUBMIT
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

      if (!record) {
        return;
      }

      await updateStudentRecord(
        record.id,

        {
          studentId,

          firstName: formattedFirstName,

          middleName: formattedMiddleName,

          lastName: formattedLastName,

          suffix: formattedSuffix,

          program,
        }
      );

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
                text-card-foregorund
              "
            >
              Edit Student Record
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-muted-foreground
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
              text-muted-foreground
              transition
              hover:bg-ring
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
              cursor-pointer
            "
          >
            Cancel
          </MotionButton>

          <MotionButton
            onClick={handleSubmit}
            disabled={loading}
            className="
              rounded-xl
              bg-primary
              px-4
              py-2
              text-sm
              font-medium
              text-primary-foreground
              transition
              hover:bg-primary/80
              disabled:opacity-70
              cursor-pointer
            "
          >
            {loading ? "Saving..." : "Save Changes"}
          </MotionButton>
        </div>
      </div>
    </MotionModal>
  );
}
