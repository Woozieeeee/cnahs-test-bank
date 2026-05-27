"use client";

import { useState } from "react";

import MotionDropdown from "@/components/motion/motionDropdown";

interface Props {
  onEdit: () => void;

  onAssignFaculty: () => void;

  onAssignSections: () => void;

  onArchive: () => void;
}

export default function SubjectCardActions({
  onEdit,
  onAssignFaculty,
  onAssignSections,
  onArchive,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="
          rounded-lg
          px-3
          py-2
          text-muted-foreground
          transition
          hover:bg-muted
        "
      >
        ⋮
      </button>

      {open && (
        <MotionDropdown
          className="
            absolute
            right-0
            z-20
            mt-2
            w-52
            rounded-xl
            border
            border-border
            bg-card
            p-2
            shadow-lg
          "
        >
          <button
            onClick={onEdit}
            className="
              w-full
              rounded-lg
              px-4
              py-2
              text-left
              text-sm
              text-foreground
              transition
              hover:bg-muted
            "
          >
            Edit Subject
          </button>

          <button
            onClick={onAssignFaculty}
            className="
              w-full
              rounded-lg
              px-4
              py-2
              text-left
              text-sm
              text-foreground
              transition
              hover:bg-muted
            "
          >
            Assign Faculty
          </button>

          <button
            onClick={onAssignSections}
            className="
              w-full
              rounded-lg
              px-4
              py-2
              text-left
              text-sm
              text-foreground
              transition
              hover:bg-muted
            "
          >
            Assign Sections
          </button>

          <button
            onClick={onArchive}
            className="
              w-full
              rounded-lg
              px-4
              py-2
              text-left
              text-sm
              text-red-500
              transition
              hover:bg-red-50
              dark:hover:bg-red-500/10
            "
          >
            Archive Subject
          </button>
        </MotionDropdown>
      )}
    </div>
  );
}
