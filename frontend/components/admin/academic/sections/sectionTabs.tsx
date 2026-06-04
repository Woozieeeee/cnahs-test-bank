"use client";

import { memo } from "react";

import Tabs from "@/components/common/tabs/tabs";

import { SECTION_NAVIGATION_TABS } from "@/constant/tabs";

interface Props {
  activeTab: string;

  setActiveTab: (tab: string) => void;
}

function SectionTabs({ activeTab, setActiveTab }: Props) {
  return (
    <Tabs
      tabs={SECTION_NAVIGATION_TABS}
      activeTab={activeTab}
      onChange={setActiveTab}
    />
  );
}

export default memo(SectionTabs);
