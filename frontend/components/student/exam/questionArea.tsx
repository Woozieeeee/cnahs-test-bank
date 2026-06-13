import { memo } from "react";
import { Card } from "@/components/ui/card";

interface Question {
  id: number;
  text: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_ANSWER";
  options?: string[];
  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
}

interface QuestionAreaProps {
  question: Question;
  selectedAnswer: string | undefined;
  onAnswerChange: (answer: string) => void;
}

function QuestionAreaComponent({
  question,
  selectedAnswer,
  onAnswerChange,
}: QuestionAreaProps) {
  const difficultyColors = {
    EASY: "bg-blue-500/20 text-blue-600",
    MEDIUM: "bg-orange-500/20 text-orange-600",
    HARD: "bg-red-500/20 text-red-600",
    EXPERT: "bg-purple-500/20 text-purple-600",
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <Card className="rounded-lg p-6 border border-border/50">
        {/* Question Text */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-foreground">{question.text}</h2>
            <span
              className={`text-xs font-bold px-2 py-1 rounded-lg ${
                difficultyColors[question.difficulty]
              }`}
            >
              {question.difficulty}
            </span>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <label
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/20 cursor-pointer transition-colors"
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={selectedAnswer === option}
                onChange={(e) => onAnswerChange(e.target.value)}
                className="h-4 w-4"
              />
              <span className="text-foreground">{option}</span>
            </label>
          ))}
        </div>
      </Card>
    </div>
  );
}

const QuestionArea = memo(QuestionAreaComponent);
export default QuestionArea;
