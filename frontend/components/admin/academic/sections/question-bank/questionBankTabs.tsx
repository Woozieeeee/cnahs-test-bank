"use client";

import { memo } from "react";

const tabs = ["ALL", "EASY", "MEDIUM", "HARD", "EXPERT"];

interface Props {
  activeTab: string;

  setActiveTab: (value: string) => void;
}

function QuestionBankTabs({
  activeTab,
  setActiveTab,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
            activeTab === tab
              ? `bg-primary text-primary-foreground`
              : `bg-muted hover:bg-muted/80`
          } `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default memo(QuestionBankTabs);
