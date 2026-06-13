import { memo } from "react";

interface Props {
  stats: { totalExams: number; ongoingExams: number; totalViolations: number };
}

function ExamMonitoringHeader({ stats }: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">Exam Monitoring</h1>

        <p className="text-muted-foreground mt-2">
          Real-time exam supervision and student tracking across all exams
        </p>
      </div>
    </div>
  );
}

export default memo(ExamMonitoringHeader);
