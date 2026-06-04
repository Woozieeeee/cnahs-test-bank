"use client";

import {
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";

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
  initialSectionIds: number[];
  onAssign: (sectionIds: number[]) => void;
}

function AssignSectionsModal({
  open,
  onOpenChange,
  sections,
  subjectName,
  initialSectionIds,
  onAssign,
}: Props) {
  const [selectedSections, setSelectedSections] = useState<
    number[]
  >([]);

  useEffect(() => {
    if (open) {
      setSelectedSections(initialSectionIds);
    }
  }, [open, initialSectionIds]);

  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const handleAssign = useCallback(() => {
    if (selectedSections.length === 0) return;

    onAssign(selectedSections);

    handleClose();
  }, [selectedSections, onAssign, handleClose]);

  if (!open) return null;

  return (
    <MotionModal open={open}>
      <div className="p-6">
        <div>
          <h2 className="text-2xl font-bold">
            Assign Sections
          </h2>

          <p className="text-muted-foreground mt-1 text-sm">
            Assign sections to{" "}
            <span className="font-medium">
              {subjectName}
            </span>
          </p>
        </div>

        <div className="mt-6">
          <SectionMultiSelect
            sections={sections}
            selectedSections={selectedSections}
            setSelectedSections={setSelectedSections}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <MotionButton
            onClick={handleClose}
            className="border-border bg-card text-muted-foreground rounded-xl border px-4 py-2 text-sm font-medium"
          >
            Cancel
          </MotionButton>

          <MotionButton
            onClick={handleAssign}
            className="bg-primary text-primary-foreground rounded-xl px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            Assign Sections
          </MotionButton>
        </div>
      </div>
    </MotionModal>
  );
}

export default memo(AssignSectionsModal);
