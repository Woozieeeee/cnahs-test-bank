"use client";

import MotionButton from "@/components/motion/motionButton";
import MotionDropdown from "@/components/motion/motionDropdown";
import { memo } from "react";

import { ChevronDown } from "lucide-react";

interface Props {
  onCreate: () => void;

  onUploadCsv: () => void;

  onHistory: () => void;

  onDownloadTemplate: () => void;
}

function QuestionBankHeader({
  onCreate,
  onUploadCsv,
  onHistory,
  onDownloadTemplate,
}: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Question Bank
        </h1>

        <p className="text-muted-foreground mt-2">
          Manage questions for this topic.
        </p>
      </div>

      <div className="flex items-center">
        <MotionButton
          onClick={onCreate}
          className="bg-primary text-primary-foreground rounded-l-xl rounded-r-none px-4 py-2"
        >
          Create Question
        </MotionButton>

        <MotionDropdown
          trigger={
            <button className="bg-primary text-primary-foreground border-primary-foreground/20 rounded-r-xl border-l px-3 py-2">
              ▼
            </button>
          }
        >
          <button
            onClick={onUploadCsv}
            className="hover:bg-muted block w-full px-4 py-2 text-left text-sm"
          >
            Upload CSV
          </button>

          <button
            onClick={onDownloadTemplate}
            className="hover:bg-muted block w-full px-4 py-2 text-left text-sm"
          >
            Download Template
          </button>

          <button
            onClick={onHistory}
            className="hover:bg-muted block w-full px-4 py-2 text-left text-sm"
          >
            Import History
          </button>
        </MotionDropdown>
      </div>
    </div>
  );
}
export default memo(QuestionBankHeader);
