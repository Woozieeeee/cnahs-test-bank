import { memo } from "react";

import TabSelector from "@/components/common/navigation/tabSelector";

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

function SectionDetailsTabs({
  activeTab,
  setActiveTab,
}: Props) {
  return (
    <TabSelector
      tabs={tabs}
      activeTab={activeTab}
      onChange={setActiveTab}
    />
  );
}

export default memo(SectionDetailsTabs);
