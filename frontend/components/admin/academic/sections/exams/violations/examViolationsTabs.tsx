"use client";

import { memo } from "react";

import MotionButton from "@/components/motion/motionButton";

const tabs = ["ALL", "HIGH", "MEDIUM", "LOW"] as const;

interface Props {
  activeTab: string;

  onTabChange: (tab: string) => void;
}

function ExamViolationsTabs({
  activeTab,
  onTabChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <MotionButton
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`rounded-lg border px-4 py-2 text-sm font-medium ${
            activeTab === tab
              ? `border-primary bg-primary text-primary-foreground`
              : `border-border bg-background`
          } `}
        >
          {tab}
        </MotionButton>
      ))}
    </div>
  );
}

export default memo(ExamViolationsTabs);
