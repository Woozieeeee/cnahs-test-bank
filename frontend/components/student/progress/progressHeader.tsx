import { memo } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, Book } from "lucide-react";

interface ProgressHeaderProps {
  totalSubjects: number;
  completedSubjects: number;
  activeSubjects: number;
  overallProgress: number;
  averageScore: number;
}

const ProgressHeader = memo(function ProgressHeader({
  totalSubjects,
  completedSubjects,
  activeSubjects,
  overallProgress,
  averageScore,
}: ProgressHeaderProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Subjects Card */}
      <Card className="rounded-lg p-5 border border-border/50">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Total Subjects</p>
            <p className="mt-2 text-2xl font-bold">{totalSubjects}</p>
            <p className="mt-1 text-xs text-muted-foreground">Enrolled</p>
          </div>
          <div className="text-muted-foreground/30">
            <Book size={24} />
          </div>
        </div>
      </Card>

      {/* Active Subjects Card */}
      <Card className="rounded-lg p-5 border border-border/50">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Active Subjects</p>
            <p className="mt-2 text-2xl font-bold">{activeSubjects}</p>
            <p className="mt-1 text-xs text-muted-foreground">In Progress</p>
          </div>
          <div className="text-muted-foreground/30">
            <TrendingUp size={24} />
          </div>
        </div>
      </Card>

      {/* Completed Subjects Card */}
      <Card className="rounded-lg p-5 border border-border/50">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Completed Subjects</p>
            <p className="mt-2 text-2xl font-bold">{completedSubjects}</p>
            <p className="mt-1 text-xs text-muted-foreground">Mastered</p>
          </div>
          <div className="text-muted-foreground/30">
            <Target size={24} />
          </div>
        </div>
      </Card>

      {/* Overall Progress Card */}
      <Card className="rounded-lg p-5 border border-border/50">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Overall Progress</p>
            <p className="mt-2 text-2xl font-bold">{overallProgress}%</p>
            <p className="mt-1 text-xs text-muted-foreground">Avg Score: {Math.round(averageScore)}%</p>
          </div>
          <div className="text-muted-foreground/30">
            <Target size={24} />
          </div>
        </div>
      </Card>
    </div>
  );
});

export default ProgressHeader;
