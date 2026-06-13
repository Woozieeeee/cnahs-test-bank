"use client";

import { ReactNode, memo } from "react";
import MotionModal from "@/components/motion/motionModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  closeButton?: boolean;
  backdrop?: boolean;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
};

function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "lg",
  closeButton = true,
  backdrop = true,
}: Props) {
  return (
    <MotionModal
      open={isOpen}
      maxWidth={sizeClasses[size]}
      contentClassName="max-h-[90vh] overflow-y-auto"
    >
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        {(title || closeButton) && (
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
            {!title && <div />}
            {closeButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </MotionModal>
  );
}

export default memo(Modal);
