"use client";

import { useState } from "react";

import MotionButton from "@/components/motion/motionButton";

import UploadCsvButton from "./uploadCsvButton";

import DownloadTemplateButton from "./downloadTemplateButton";

interface Props {
  onUploadSuccess: () => void;

  onAddStudent: () => void;
}

export default function StudentRecordsActions({
  onUploadSuccess,

  onAddStudent,
}: Props) {
  const [openTools, setOpenTools] = useState(false);

  return (
    <div className="flex items-center gap-3">
      {/* ADD STUDENT */}

      <MotionButton
        onClick={onAddStudent}
        className="
          rounded-xl
          bg-slate-900
          px-4
          py-3
          text-sm
          font-medium
          text-white
          transition
          hover:bg-slate-800
        "
      >
        Add Student
      </MotionButton>

      {/* TOOLS */}

      <div className="relative">
        <MotionButton
          onClick={() => setOpenTools(!openTools)}
          className="
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-3
            text-sm
            font-medium
            text-slate-700
            transition
            hover:bg-slate-50
          "
        >
          Tools ▾
        </MotionButton>

        {/* DROPDOWN */}

        {openTools && (
          <div
            className="
              absolute
              right-0
              z-20
              mt-2
              w-52
              rounded-xl
              border
              border-slate-200
              bg-white
              p-2
              shadow-lg
            "
          >
            <div className="space-y-2">
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
