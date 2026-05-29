"use client";

import MotionButton from "@/components/motion/motionButton";

interface Props {
  loading?: boolean;

  onCancel: () => void;
}

export default function EditSectionActions({
  loading,

  onCancel,
}: Props) {
  return (
    <div
      className="
        mt-6
        flex
        justify-end
        gap-3
      "
    >
      <MotionButton
        type="button"
        onClick={onCancel}
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
        type="submit"
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
          hover:bg-primary/90
        "
      >
        {loading ? "Saving..." : "Save Changes"}
      </MotionButton>
    </div>
  );
}
