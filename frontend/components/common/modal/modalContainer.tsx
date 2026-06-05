"use client";

import { ReactNode } from "react";
import { memo } from "react";
import MotionModal from "@/components/motion/motionModal";

interface Props {
  open: boolean;

  children: ReactNode;

  maxWidth?: string;

  contentClassName?: string;
}

function ModalContainer({
  open,
  children,
  maxWidth = "max-w-3xl",
  contentClassName = "max-h-[90vh] overflow-y-auto p-6",
}: Props) {
  return (
    <MotionModal
      open={open}
      maxWidth={maxWidth}
      contentClassName={contentClassName}
    >
      {children}
    </MotionModal>
  );
}
export default memo(ModalContainer);
