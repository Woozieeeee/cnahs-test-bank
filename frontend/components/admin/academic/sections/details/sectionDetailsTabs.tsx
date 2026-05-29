"use client";

import MotionButton from "@/components/motion/motionButton";

const tabs = [
  "STUDENTS",
  "SUBJECTS",
  "EXAMS",
  "VIOLATIONS",
];

interface Props {
  activeTab: string;

  setActiveTab: (tab: string) => void;
}

export default function SectionDetailsTabs({
  activeTab,

  setActiveTab,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const active = activeTab === tab;

        return (
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
                active
                  ? `
                    bg-primary
                    text-primary-foreground
                  `
                  : `
                    border
                    border-border
                    bg-card
                    text-muted-foreground
                    hover:bg-muted
                  `
              }
            `}
          >
            {tab}
          </MotionButton>
        );
      })}
    </div>
  );
}
