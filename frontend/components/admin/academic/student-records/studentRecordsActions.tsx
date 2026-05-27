"use client";

import { useEffect, useRef, useState } from "react";

import MotionButton from "@/components/motion/motionButton";

import UploadCsvButton from "./uploadCsvButton";

import DownloadTemplateButton from "./downloadTemplateButton";

import { ChevronDown, Plus } from "lucide-react";

interface Props {
  onUploadSuccess: () => void;

  onAddStudent: () => void;
}

export default function StudentRecordsActions({
  onUploadSuccess,

  onAddStudent,
}: Props) {
  const [openTools, setOpenTools] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // =========================
  // CLICK OUTSIDE
  // =========================

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenTools(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div className="flex items-center gap-3">
      {/* ADD STUDENT */}

      <MotionButton
        onClick={onAddStudent}
        className="
            flex
            h-[50px]
            items-center
            rounded-xl
            border
            border-border
            bg-primary
            px-5
            text-sm
            font-medium
            text-card
            transition
            hover:bg-primary/80
            cursor-pointer
          "
      >
        <div className="flex items-center gap-2">
          <Plus size={16} />

          <span>Add Student</span>
        </div>
      </MotionButton>

      {/* TOOLS */}

      <div ref={dropdownRef} className="relative">
        <MotionButton
          onClick={() => setOpenTools(!openTools)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpenTools(false);
            }
          }}
          aria-expanded={openTools}
          aria-haspopup="menu"
          className="
            flex
            h-[50px]
            items-center
            rounded-xl
            border
            border-border
            bg-card
            px-5
            text-sm
            font-medium
            text-foreground
            transition
            hover:bg-muted
            cursor-pointer
          "
        >
          <div className="flex items-center gap-2">
            <span>Tools</span>

            <ChevronDown
              size={16}
              className={`
                transition-transform
                duration-200
                ${openTools ? "rotate-180" : ""}
              `}
            />
          </div>
        </MotionButton>

        {/* DROPDOWN */}

        {openTools && (
          <div
            className="
              absolute
              right-0
              z-20
              mt-1
              w-56
              origin-top-right
              rounded-xl
              border
              border-border
              bg-card
              p-2
              shadow-lg
              animate-in
              fade-in
              zoom-in-95
              duration-150
            "
          >
            <div className="space-y-1">
              <DownloadTemplateButton />

              <UploadCsvButton
                onSuccess={onUploadSuccess}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
