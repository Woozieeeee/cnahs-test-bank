"use client";

import MotionButton from "@/components/motion/motionButton";

import { Pencil, Archive, RotateCcw } from "lucide-react";
import { memo } from "react";

interface Props {
  archived: boolean;

  onEdit: () => void;

  onArchive: () => void;

  onRestore: () => void;
}

function QuestionRowActions({
  archived,
  onEdit,
  onArchive,
  onRestore,
}: Props) {
  return (
    <div className="flex justify-end gap-2">
      <MotionButton
        title="Edit Question"
        onClick={onEdit}
        className="hover:bg-muted rounded-lg p-2"
      >
        <Pencil size={16} />
      </MotionButton>

      {archived ? (
        <MotionButton
          title="Restore Question"
          onClick={onRestore}
          className="rounded-lg p-2 text-green-600 hover:bg-green-500/10"
        >
          <RotateCcw size={16} />
        </MotionButton>
      ) : (
        <MotionButton
          title="Archive Question"
          onClick={onArchive}
          className="rounded-lg p-2 text-red-500 hover:bg-red-500/10"
        >
          <Archive size={16} />
        </MotionButton>
      )}
    </div>
  );
}

export default memo(QuestionRowActions);
