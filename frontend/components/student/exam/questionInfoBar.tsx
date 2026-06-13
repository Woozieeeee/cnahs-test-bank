import { memo } from "react";
import { Clock } from "lucide-react";

interface QuestionInfoBarProps {
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: number;
  formatTime: (seconds: number) => string;
  totalViolations: number;
  violationThreshold: number;
  questionTimeDisplay?: string;
  hasQuestionTimer?: boolean;
}

function QuestionInfoBarComponent({
  currentQuestion,
  totalQuestions,
  timeLeft,
  formatTime,
  totalViolations,
  violationThreshold,
  questionTimeDisplay,
  hasQuestionTimer,
}: QuestionInfoBarProps) {
  return (
    <div className="border-b border-border/30 bg-muted/20 px-6 py-3 flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Question {currentQuestion} of {totalQuestions}
      </div>

      {/* Question Timer */}
      {hasQuestionTimer && questionTimeDisplay && (
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold ${
            questionTimeDisplay === "0:00"
              ? "bg-red-500/20 text-red-600"
              : "bg-blue-500/20 text-blue-600"
          }`}
        >
          <Clock size={16} />
          <span className="font-mono">Q: {questionTimeDisplay}</span>
        </div>
      )}

      {/* Exam Timer */}
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
          timeLeft < 300
            ? "bg-red-500/20 text-red-600"
            : timeLeft < 600
            ? "bg-amber-500/20 text-amber-600"
            : "bg-primary/20 text-primary"
        }`}
      >
        <Clock size={18} />
        <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
      </div>

      {/* Violation Count */}
      <div
        className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold ${
          totalViolations >= violationThreshold
            ? "bg-red-500/20 text-red-600"
            : totalViolations > 0
            ? "bg-amber-500/20 text-amber-600"
            : "bg-emerald-500/20 text-emerald-600"
        }`}
      >
        🛡️ {totalViolations}/{violationThreshold}
      </div>
    </div>
  );
}

const QuestionInfoBar = memo(QuestionInfoBarComponent);
export default QuestionInfoBar;
