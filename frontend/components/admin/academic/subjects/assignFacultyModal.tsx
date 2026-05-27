"use client";

import { useState } from "react";

import MotionModal from "@/components/motion/motionModal";
import FacultySelect from "../shared/facultyMultiSelect";
import MotionButton from "@/components/motion/motionButton";

interface Faculty {
  id: number;

  name: string;
}

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  facultyList: Faculty[];

  subjectName: string;

  onAssign: (facultyId: number) => void;
}

export default function AssignFacultyModal({
  open,
  onOpenChange,
  facultyList,
  subjectName,
  onAssign,
}: Props) {
  const [selectedFaculty, setSelectedFaculty] = useState<
    number | null
  >(null);

  if (!open) return null;

  return (
    <MotionModal open={open}>
      <div className="p-6">
        {/* HEADER */}

        <div>
          <h2
            className="
              text-2xl
              font-bold
              text-foreground
            "
          >
            Assign Faculty
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-muted-foreground
            "
          >
            Assign faculty to{" "}
            <span className="font-medium">
              {subjectName}
            </span>
          </p>
        </div>

        {/* SELECT */}

        <div className="mt-6">
          <FacultySelect
            facultyList={facultyList}
            selectedFaculty={selectedFaculty}
            setSelectedFaculty={setSelectedFaculty}
          />
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
            onClick={() => {
              if (!selectedFaculty) return;

              onAssign(selectedFaculty);

              onOpenChange(false);
            }}
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
            Assign Faculty
          </MotionButton>
        </div>
      </div>
    </MotionModal>
  );
}
