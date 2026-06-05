"use client";

import { memo } from "react";

import MotionButton from "@/components/motion/motionButton";

interface Props {
  activeTab: string;

  setActiveTab: (value: string) => void;
}

const tabs = [
  "ALL",
  "DRAFT",
  "SCHEDULED",
  "ONGOING",
  "COMPLETED",
  "ARCHIVED",
];

function ExamStatusTabs({
  activeTab,
  setActiveTab,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <MotionButton
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`rounded-xl px-4 py-2 ${
            activeTab === tab
              ? "bg-primary text-primary-foreground"
              : "border-border border"
          }`}
        >
          {tab}
        </MotionButton>
      ))}
    </div>
  );
}

export default memo(ExamStatusTabs);
