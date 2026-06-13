import { memo, useMemo } from "react";
import Tabs from "@/components/common/tabs/tabs";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  exams: any[];
}

function ExamMonitoringTabsSimple({ activeTab, setActiveTab, exams }: Props) {
  const tabs = ["ALL", "SCHEDULED", "ONGOING", "COMPLETED"];

  // Memoize the tab labels to recalculate when exams change
  const tabLabels = useMemo(
    () =>
      tabs.map((tab) => {
        if (tab === "ALL") return `ALL (${exams.length})`;
        // Count exams by their actual current status
        const count = exams.filter((e) => e.status === tab).length;
        return `${tab} (${count})`;
      }),
    [exams]
  );

  // Find the index of the active tab in the tabs array
  const activeTabIndex = tabs.indexOf(activeTab);
  const activeTabLabel = tabLabels[activeTabIndex] || tabLabels[0];

  // Handle tab changes - extract the tab name (before the space and count)
  const handleTabChange = (selected: string) => {
    const tabName = selected.split(" ")[0];
    setActiveTab(tabName);
  };

  return (
    <Tabs 
      tabs={tabLabels} 
      activeTab={activeTabLabel}
      onChange={handleTabChange} 
    />
  );
}

export default memo(ExamMonitoringTabsSimple);
