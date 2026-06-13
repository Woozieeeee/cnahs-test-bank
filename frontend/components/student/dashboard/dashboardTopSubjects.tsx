import { memo } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight } from "lucide-react";
import type { SubjectCardData } from "@/services/student_dashboard_service";

interface DashboardTopSubjectsProps {
  subjects: SubjectCardData[];
}

const DashboardTopSubjects = memo(function DashboardTopSubjects({
  subjects,
}: DashboardTopSubjectsProps) {
  const topSubjects = subjects.sort((a, b) => b.progress - a.progress).slice(0, 3);

  if (subjects.length === 0) {
    return null;
  }

  return (
    <Card className="mt-12 p-6 rounded-lg border border-border/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-semibold">Top Subjects</h2>
        <Link href="/student/subjects" className="text-sm text-primary hover:underline">
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topSubjects.map((subject) => (
          <Link key={subject.id} href={`/student/subjects/${subject.slug}`}>
            <Card className="p-4 hover:border-primary/50 transition-colors rounded-lg border border-border/50 cursor-pointer h-full">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-sm line-clamp-1">{subject.name}</h3>
                  <p className="text-xs text-muted-foreground">{subject.code}</p>
                </div>
                <div className="bg-muted text-foreground px-2 py-1 rounded text-xs font-semibold">
                  {subject.progress}%
                </div>
              </div>

              <div className="mb-3">
                <Progress value={subject.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div className="bg-muted rounded p-2">
                  <p className="text-muted-foreground text-xs">Current</p>
                  <p className="font-semibold text-foreground">{subject.currentTier}</p>
                </div>
                <div className="bg-muted rounded p-2">
                  <p className="text-muted-foreground text-xs">Exams</p>
                  <p className="font-semibold text-foreground">{subject.examsAvailable}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-primary text-xs font-semibold">
                Continue <ChevronRight size={12} />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Card>
  );
});

export default DashboardTopSubjects;
