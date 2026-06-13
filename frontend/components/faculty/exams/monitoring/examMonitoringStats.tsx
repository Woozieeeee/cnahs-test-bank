import { memo } from "react";
import StatCard from "@/components/common/cards/statCard";
import StatsGrid from "@/components/common/cards/statsGrid";

interface Props {
  stats: {
    totalExams: number;
    ongoingExams: number;
    totalActiveStudents: number;
    totalViolations: number;
    highRiskExams: number;
    flaggedStudents: number;
  };
}

function ExamMonitoringStats({ stats }: Props) {
  return (
    <StatsGrid columns="md:grid-cols-1 lg:grid-cols-6">
      <StatCard label="Total Exams" value={stats.totalExams} />
      <StatCard label="Ongoing" value={stats.ongoingExams} />
      <StatCard label="Active Students" value={stats.totalActiveStudents} />
      <StatCard label="Total Violations" value={stats.totalViolations} />
      <StatCard label="High Risk Exams" value={stats.highRiskExams} />
      <StatCard label="Flagged Students" value={stats.flaggedStudents} />
    </StatsGrid>
  );
}

export default memo(ExamMonitoringStats);
