import { memo } from "react";

import MotionButton from "@/components/motion/motionButton";

interface Props {
  tabs: string[];

  activeTab: string;

  onChange: (tab: string) => void;
}

function TabSelector({ tabs, activeTab, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const active = activeTab === tab;

        return (
          <MotionButton
            key={tab}
            onClick={() => onChange(tab)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
              active
                ? `bg-primary text-primary-foreground`
                : `border-border bg-card text-muted-foreground hover:bg-muted border`
            } `}
          >
            {tab}
          </MotionButton>
        );
      })}
    </div>
  );
}

export default memo(TabSelector);
