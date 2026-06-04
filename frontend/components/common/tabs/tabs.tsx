"use client";

import { memo } from "react";
interface Props {
  tabs: ReadonlyArray<string>;
  activeTab: string;
  onChange: (tab: string) => void;
}

function Tabs({ tabs, activeTab, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const active = activeTab === tab;

        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
              active
                ? `bg-primary text-primary-foreground`
                : `bg-card text-muted-foreground hover:bg-muted`
            } `}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

export default memo(Tabs);
