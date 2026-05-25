"use client";

import MotionButton from "@/components/motion/motionButton";

const tabs = ["SECTIONS", "SUBJECTS", "ASSIGNMENTS"];

interface Props {
  activeTab: string;

  setActiveTab: (tab: string) => void;
}

export default function AcademicTabs({
  activeTab,

  setActiveTab,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <MotionButton
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`
            rounded-xl
            px-4
            py-2
            text-sm
            font-medium
            transition

            ${
              activeTab === tab
                ? "bg-slate-900 text-white"
                : `
                  bg-white
                  text-slate-600
                  hover:bg-slate-100
                `
            }
          `}
        >
          {tab}
        </MotionButton>
      ))}
    </div>
  );
}
