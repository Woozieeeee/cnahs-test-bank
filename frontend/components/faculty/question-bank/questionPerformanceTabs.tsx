"use client";

import { memo } from "react";
import MotionButton from "@/components/motion/motionButton";

interface Props {
  activeTab: "WEAK" | "STRONG";

  setActiveTab: (value: "WEAK" | "STRONG") => void;
}

function QuestionPerformanceTabs({
  activeTab,
  setActiveTab,
}: Props) {
  return (
    <div className="mt-6 flex gap-2">
      <MotionButton
        onClick={() => setActiveTab("WEAK")}
        className={`rounded-xl px-4 py-2 ${
          activeTab === "WEAK"
            ? "bg-primary text-primary-foreground"
            : "border-border border"
        }`}
      >
        Challenging Questions
      </MotionButton>

      <MotionButton
        onClick={() => setActiveTab("STRONG")}
        className={`rounded-xl px-4 py-2 ${
          activeTab === "STRONG"
            ? "bg-primary text-primary-foreground"
            : "border-border border"
        }`}
      >
        Well-Performed Questions
      </MotionButton>
    </div>
  );
}
export default memo(QuestionPerformanceTabs);
