import { memo, useState } from "react";
import { Card } from "@/components/ui/card";
import Pagination from "@/components/common/pagination";
import { ExamDetailsModal } from "./examDetailsModal";
import type { ExamData } from "@/services/student_subject_details_service";

interface ExamHistoryProps {
  exams: ExamData[];
}

const ITEMS_PER_PAGE = 6;

function ExamHistoryCardComponent({
  exam,
  isCompleted,
  isUnanswered,
  onViewDetails,
}: {
  exam: ExamData;
  isCompleted: boolean;
  isUnanswered: boolean;
  onViewDetails: (exam: ExamData) => void;
}) {
  return (
    <Card 
      onClick={() => onViewDetails(exam)}
      className={`p-5 border-2 rounded-2xl transition-all cursor-pointer ${
      isCompleted
        ? "bg-emerald-500/5 border-emerald-500/30 hover:border-emerald-500/50"
        : isUnanswered
        ? "bg-amber-500/5 border-amber-500/30 hover:border-amber-500/50"
        : "bg-muted/20 border-muted/50 hover:border-muted/70"
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground line-clamp-2">{exam.title}</h4>
          <p className="text-xs text-muted-foreground mt-2">
            {new Date(exam.endsAt || new Date()).toLocaleString()}
          </p>
        </div>

        <div className="flex-shrink-0">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${
              isCompleted
                ? "bg-emerald-100 text-emerald-700"
                : isUnanswered
                ? "bg-amber-100 text-amber-700"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {isCompleted
              ? "Completed"
              : isUnanswered
              ? "Not Answered"
              : "Missing"}
          </span>
        </div>
      </div>

      {/* Status Details */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isCompleted && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Score:</span>
              <span className="text-sm font-semibold text-emerald-600">
                {exam.lastAttemptScore !== undefined
                  ? exam.lastAttemptScore > exam.passingScore
                    ? `${exam.lastAttemptScore}% ✅`
                    : `${exam.lastAttemptScore}% ❌`
                  : "-"}
              </span>
            </div>
          )}
          {isUnanswered && (
            <span className="text-sm font-medium text-amber-600">⏱️ Time Expired</span>
          )}
        </div>
        {isCompleted && (
          <span className="text-xs text-muted-foreground">
            Pass Score: {exam.passingScore}%
          </span>
        )}
      </div>
    </Card>
  );
}

function ExamHistoryComponent({ exams }: ExamHistoryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedExam, setSelectedExam] = useState<ExamData | null>(null);
  
  const now = new Date();
  const completedExams = exams.filter((exam) => {
    const endsAt = exam.endsAt ? new Date(exam.endsAt) : null;
    if (exam.hasAttempted && ["SUBMITTED", "AUTO_SUBMITTED", "COMPLETED"].includes(exam.attemptStatus || "")) {
      return true;
    }
    if (endsAt && endsAt <= now) return true;
    return false;
  });

  if (completedExams.length === 0) {
    return (
      <Card className="bg-muted/40 border-muted border-dashed p-8">
        <p className="text-center text-muted-foreground">
          No exam history yet.
        </p>
      </Card>
    );
  }

  const totalPages = Math.ceil(completedExams.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedExams = completedExams.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedExams.map((exam) => {
            const examAttemptStatus = exam.attemptStatus || "EXPIRED";
            const isCompleted = exam.hasAttempted === true && ["SUBMITTED", "AUTO_SUBMITTED", "COMPLETED"].includes(examAttemptStatus);
            const isExpired = !isCompleted && new Date(exam.endsAt || new Date()) <= now;
            const isUnanswered = isExpired && exam.hasAttempted !== true;

            return (
              <ExamHistoryCardComponent
                key={exam.id}
                exam={exam}
                isCompleted={isCompleted}
                isUnanswered={isUnanswered}
                onViewDetails={setSelectedExam}
              />
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center pt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      <ExamDetailsModal
        isOpen={selectedExam !== null}
        onClose={() => setSelectedExam(null)}
        exam={selectedExam}
      />
    </>
  );
}

export const ExamHistory = memo(ExamHistoryComponent);
