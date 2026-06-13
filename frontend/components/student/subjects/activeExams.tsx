import { memo } from "react";
import { Card } from "@/components/ui/card";
import ExamCard from "@/components/student/ExamCard";
import type { ExamData } from "@/services/student_subject_details_service";

interface ActiveExamsProps {
  exams: ExamData[];
}

function ActiveExamsComponent({ exams }: ActiveExamsProps) {
  const now = new Date();
  const availableExams = exams.filter((exam) => {
    const endsAt = exam.endsAt ? new Date(exam.endsAt) : null;
    if (exam.hasAttempted && ["SUBMITTED", "AUTO_SUBMITTED", "COMPLETED"].includes(exam.attemptStatus || "")) {
      return false;
    }
    if (endsAt && endsAt <= now) return false;
    return true;
  });

  if (availableExams.length === 0) {
    return (
      <Card className="bg-muted/40 border-muted border-dashed p-8">
        <p className="text-center text-muted-foreground">
          No active exams available in this tier.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <h4 className="text-lg font-semibold text-foreground">
        Available Exams ({availableExams.length})
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableExams.map((exam) => {
          const startsAt = exam.startsAt ? new Date(exam.startsAt) : null;
          const endsAt = exam.endsAt ? new Date(exam.endsAt) : null;
          const canTake =
            (!startsAt || startsAt <= now) && (!endsAt || endsAt > now);

          return (
            <ExamCard
              key={exam.id}
              id={exam.id}
              title={exam.title}
              description={exam.description}
              duration={exam.duration}
              totalQuestions={exam.totalQuestions}
              passingScore={exam.passingScore}
              startsAt={exam.startsAt}
              endsAt={exam.endsAt}
              canTake={canTake}
            />
          );
        })}
      </div>
    </div>
  );
}

export const ActiveExams = memo(ActiveExamsComponent);
