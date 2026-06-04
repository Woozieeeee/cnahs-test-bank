"use client";

import {
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";

import MotionModal from "@/components/motion/motionModal";
import MotionButton from "@/components/motion/motionButton";

import FacultySelect from "../shared/facultyMultiSelect";

interface Faculty {
  id: number;
  name: string;
}

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  facultyList: Faculty[];

  subjectName: string;

  initialFacultyIds: number[];

  onAssign: (facultyIds: number[]) => void;
}

function AssignFacultyModal({
  open,
  onOpenChange,
  facultyList,
  subjectName,
  initialFacultyIds,
  onAssign,
}: Props) {
  const [selectedFaculties, setSelectedFaculties] =
    useState<number[]>([]);

  useEffect(() => {
    if (open) {
      setSelectedFaculties(initialFacultyIds);
    }
  }, [open, initialFacultyIds]);

  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const handleAssign = useCallback(() => {
    onAssign(selectedFaculties);

    handleClose();
  }, [selectedFaculties, onAssign, handleClose]);

  if (!open) return null;

  return (
    <MotionModal open={open}>
      <div className="p-6">
        {/* HEADER */}

        <div>
          <h2 className="text-2xl font-bold">
            Manage Faculty Pool
          </h2>

          <p className="text-muted-foreground mt-1 text-sm">
            Select faculty members authorized to teach{" "}
            <span className="font-medium">
              {subjectName}
            </span>
            .
          </p>
        </div>

        {/* FACULTY SELECT */}

        <div className="mt-6">
          <FacultySelect
            facultyList={facultyList}
            selectedFaculties={selectedFaculties}
            setSelectedFaculties={setSelectedFaculties}
          />
        </div>

        {/* FOOTER */}

        <div className="mt-6 flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            {selectedFaculties.length} faculty selected
          </p>

          <div className="flex gap-3">
            <MotionButton
              onClick={handleClose}
              className="border-border bg-card text-muted-foreground rounded-xl border px-4 py-2 text-sm font-medium"
            >
              Cancel
            </MotionButton>

            <MotionButton
              disabled={false}
              onClick={handleAssign}
              className="bg-primary text-primary-foreground rounded-xl px-4 py-2 text-sm font-medium disabled:opacity-50"
            >
              Save Faculty Pool
            </MotionButton>
          </div>
        </div>
      </div>
    </MotionModal>
  );
}

export default memo(AssignFacultyModal);
