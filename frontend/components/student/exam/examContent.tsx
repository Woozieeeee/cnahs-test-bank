import { memo } from "react";
import ExamHeader from "@/components/student/exam/examHeader";
import QuestionInfoBar from "@/components/student/exam/questionInfoBar";
import QuestionArea from "@/components/student/exam/questionArea";
import ExamNavigationFooter from "@/components/student/exam/examNavigationFooter";
import ViolationModal from "@/components/student/exam/violationModal";
import { ExamRightSidebar } from "@/components/student/exam/examRightSidebar";
import type { ExamQuestion, ExamConfig, ExamViolation } from "@/types/exams/examSession";

interface ExamContentProps {
  title: string;
  currentQuestion: ExamQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  timeLeft: number;
  formatTime: (seconds: number) => string;
  totalViolations: number;
  violationThreshold: number;
  config: ExamConfig;
  selectedAnswer?: string;
  answeredCount: number;
  lastViolation: ExamViolation | null;
  questionTimeDisplay?: string;
  hasQuestionTimer?: boolean;
  onAnswerChange: (answer: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onCloseViolationModal: () => void;
}

function ExamContentComponent({
  title,
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  timeLeft,
  formatTime,
  totalViolations,
  violationThreshold,
  config,
  selectedAnswer,
  answeredCount,
  lastViolation,
  questionTimeDisplay,
  hasQuestionTimer,
  onAnswerChange,
  onPrevious,
  onNext,
  onSubmit,
  onCloseViolationModal,
}: ExamContentProps) {
  return (
    <div className="fixed inset-0 bg-background overflow-hidden flex flex-col">
      <ExamHeader title={title} />

      <div className="flex-1 flex gap-6 overflow-hidden p-6">
        {/* Main Question Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <QuestionInfoBar
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            timeLeft={timeLeft}
            formatTime={formatTime}
            totalViolations={totalViolations}
            violationThreshold={violationThreshold}
            questionTimeDisplay={questionTimeDisplay}
            hasQuestionTimer={hasQuestionTimer}
          />

          <QuestionArea
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onAnswerChange={onAnswerChange}
          />

          <ExamNavigationFooter
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            answeredCount={answeredCount}
            onPrevious={onPrevious}
            onNext={onNext}
            onSubmit={onSubmit}
          />
        </div>

        {/* Right Side - Violations & Security Rules */}
        <ExamRightSidebar
          totalViolations={totalViolations}
          violationThreshold={violationThreshold}
          config={config}
        />
      </div>

      <ViolationModal
        violation={lastViolation}
        totalViolations={totalViolations}
        violationThreshold={violationThreshold}
        onClose={onCloseViolationModal}
      />
    </div>
  );
}

export const ExamContent = memo(ExamContentComponent);
