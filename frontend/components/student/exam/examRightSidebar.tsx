import { memo } from "react";
import { ViolationThresholdPanel } from "@/components/student/exam/violationThresholdPanel";
import { SecurityRulesDisplay } from "@/components/student/exam/securityRulesDisplay";
import type { ExamConfig } from "@/types/exams/examSession";

interface ExamRightSidebarProps {
  totalViolations: number;
  violationThreshold: number;
  config: ExamConfig;
  isCollapsed?: boolean;
}

function ExamRightSidebarComponent({
  totalViolations,
  violationThreshold,
  config,
  isCollapsed = false,
}: ExamRightSidebarProps) {
  if (isCollapsed) {
    return null;
  }

  return (
    <div className="w-80 flex-shrink-0 overflow-y-auto space-y-4 pr-2">
      {/* Violation Threshold Card */}
      <ViolationThresholdPanel
        totalViolations={totalViolations}
        violationThreshold={violationThreshold}
      />

      {/* Security Rules Display */}
      <SecurityRulesDisplay config={config} />
    </div>
  );
}

export const ExamRightSidebar = memo(ExamRightSidebarComponent);
