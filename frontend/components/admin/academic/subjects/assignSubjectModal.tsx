"use client";

import { useState } from "react";

import MotionModal from "@/components/motion/motionModal";

import MotionButton from "@/components/motion/motionButton";

import SectionMultiSelect from "../shared/sectionMultiSelect";

interface Section {
  id: number;

  name: string;
}

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  sections: Section[];

  subjectName: string;

  onAssign: (sectionIds: number[]) => void;
}

export default function AssignSectionsModal({
  open,
  onOpenChange,
  sections,
  subjectName,
  onAssign,
}: Props) {
  const [selectedSections, setSelectedSections] = useState<
    number[]
  >([]);

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
            Assign Sections
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-muted-foreground
            "
          >
            Assign sections to{" "}
            <span className="font-medium">
              {subjectName}
            </span>
          </p>
        </div>

        {/* MULTI SELECT */}

        <div className="mt-6">
          <SectionMultiSelect
            sections={sections}
            selectedSections={selectedSections}
            setSelectedSections={setSelectedSections}
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
              onAssign(selectedSections);

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
            Assign Sections
          </MotionButton>
        </div>
      </div>
    </MotionModal>
  );
}
