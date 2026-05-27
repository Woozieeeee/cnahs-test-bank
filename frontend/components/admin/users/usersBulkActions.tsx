"use client";

import MotionButton from "@/components/motion/motionButton";

interface Props {
  selectedCount: number;

  onApprove: () => void;

  onReject: () => void;

  onClear: () => void;
}

export default function UsersBulkActions({
  selectedCount,

  onApprove,

  onReject,

  onClear,
}: Props) {
  if (selectedCount < 2) return null;

  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-border
        bg-card
        p-4
      "
    >
      {/* LEFT */}

      <p
        className="
          text-sm
          font-medium
          text-foreground
        "
      >
        {selectedCount} users selected
      </p>

      {/* ACTIONS */}

      <div className="flex items-center gap-3">
        <MotionButton
          onClick={onClear}
          className="
            rounded-xl
            border
            border-border
            px-4
            py-2
            text-sm
            font-medium
            text-foreground
            transition
            hover:bg-muted
          "
        >
          Clear Selection
        </MotionButton>

        <MotionButton
          onClick={onApprove}
          className="
            rounded-xl
            bg-emerald-600
            px-4
            py-2
            text-sm
            font-medium
            text-white
            transition
            hover:bg-emerald-700
          "
        >
          Approve Selected
        </MotionButton>

        <MotionButton
          onClick={onReject}
          className="
            rounded-xl
            bg-red-600
            px-4
            py-2
            text-sm
            font-medium
            text-white
            transition
            hover:bg-red-700
          "
        >
          Reject Selected
        </MotionButton>
      </div>
    </div>
  );
}
