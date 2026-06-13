import { memo } from "react";
import { CheckCircle2 } from "lucide-react";

interface ExamNavigationFooterProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  answeredCount: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

function ExamNavigationFooterComponent({
  currentQuestionIndex,
  totalQuestions,
  answeredCount,
  onPrevious,
  onNext,
  onSubmit,
}: ExamNavigationFooterProps) {
  return (
    <div className="border-t border-border/30 bg-card/50 backdrop-blur-sm p-4 flex items-center justify-between">
      <button
        onClick={onPrevious}
        disabled={currentQuestionIndex === 0}
        className="px-4 py-2 rounded-lg border border-border/50 hover:bg-muted/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
      >
        ← Previous
      </button>

      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">
          {answeredCount} of {totalQuestions} answered
        </span>
        <div className="h-2 w-32 bg-muted/40 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{
              width: `${(answeredCount / totalQuestions) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onNext}
          disabled={currentQuestionIndex === totalQuestions - 1}
          className="px-4 py-2 rounded-lg border border-border/50 hover:bg-muted/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Next →
        </button>

        <button
          onClick={onSubmit}
          className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors flex items-center gap-2"
        >
          <CheckCircle2 size={18} />
          Submit Exam
        </button>
      </div>
    </div>
  );
}

const ExamNavigationFooter = memo(ExamNavigationFooterComponent);
export default ExamNavigationFooter;
