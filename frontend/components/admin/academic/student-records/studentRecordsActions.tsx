"use client";

import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import MotionButton from "@/components/motion/motionButton";

import UploadCsvButton from "./tools/uploadCsvButton";

import DownloadTemplateButton from "./tools/downloadTemplateButton";

import { ChevronDown, Plus } from "lucide-react";

interface Props {
  onUploadSuccess: () => void;

  onAddStudent: () => void;
}

const baseButtonClassName = `
  flex
  h-[50px]
  items-center
  rounded-xl
  border
  px-5
  text-sm
  font-medium
  transition-all
  duration-200
  cursor-pointer
`;

function StudentRecordsActions({
  onUploadSuccess,
  onAddStudent,
}: Props) {
  const [openTools, setOpenTools] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // =========================
  // TOGGLE DROPDOWN
  // =========================

  const toggleTools = useCallback(() => {
    setOpenTools((prev) => !prev);
  }, []);

  // =========================
  // CLOSE DROPDOWN
  // =========================

  const closeTools = useCallback(() => {
    setOpenTools(false);
  }, []);

  // =========================
  // CLICK OUTSIDE
  // =========================

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeTools();
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
  }, [closeTools]);

  return (
    <div className="flex items-center gap-3">
      {/* ADD STUDENT */}

      <MotionButton
        onClick={onAddStudent}
        className={` ${baseButtonClassName} border-border bg-primary text-primary-foreground hover:bg-primary/80`}
      >
        <div className="flex items-center gap-2">
          <Plus size={16} />

          <span>Add Student</span>
        </div>
      </MotionButton>

      {/* TOOLS */}

      <div ref={dropdownRef} className="relative">
        <MotionButton
          onClick={toggleTools}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              closeTools();
            }
          }}
          aria-expanded={openTools}
          aria-haspopup="menu"
          className={` ${baseButtonClassName} border-border bg-card text-foreground hover:bg-muted`}
        >
          <div className="flex items-center gap-2">
            <span>Tools</span>

            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${openTools ? "rotate-180" : ""} `}
            />
          </div>
        </MotionButton>

        {/* DROPDOWN */}

        {openTools && (
          <div className="border-border bg-card animate-in fade-in zoom-in-95 absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-xl border p-2 shadow-lg duration-200">
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

export default memo(StudentRecordsActions);
