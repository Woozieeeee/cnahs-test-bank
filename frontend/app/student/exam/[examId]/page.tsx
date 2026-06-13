"use client";

import { memo, useEffect, useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import useProtectedRoute from "@/hooks/auth/useProtectedRoute";
import { useExamSecurityMonitoring } from "@/hooks/exam/useExamSecurityMonitoring";
import { useExamData } from "@/hooks/exam/useExamData";
import { useExamTimer } from "@/hooks/exam/useExamTimer";
import { useFullscreenMode } from "@/hooks/exam/useFullscreenMode";
import { useThresholdEnforcement } from "@/hooks/exam/useThresholdEnforcement";
import { useExamSession } from "@/hooks/exam/useExamSession";
import { useExamHandlers } from "@/hooks/exam/useExamHandlers";
import { useExamViolationReporting } from "@/hooks/exam/useExamViolationReporting";
import { ExamContent } from "@/components/student/exam/examContent";
import { ExamLoadingState } from "@/components/student/exam/examLoadingState";
import { ExamErrorState } from "@/components/student/exam/examErrorState";
import type { ExamConfig } from "@/types/exams/examSession";

const DEFAULT_CONFIG: ExamConfig = {
  randomizeQuestions: false,
  randomizeAnswers: false,
  showResultAfterSubmission: false,
  showCorrectAnswers: false,
  showExplanations: false,
  requireFullscreen: true,
  detectTabSwitch: true,
  detectWindowBlur: true,
  blockCopy: true,
  blockPaste: true,
  blockRightClick: true,
  detectDeviceChange: true,
  violationThreshold: 5,
  thresholdAction: "FLAG_REVIEW",
};

function ExamPageComponent() {
  const { loading: authLoading, isAuthenticated } = useProtectedRoute(["STUDENT"]);
  const params = useParams();
  const examId = params.examId as string;

  const { examData, isLoading, error } = useExamData({
    examId,
    enabled: !authLoading && isAuthenticated,
  });

  const examConfig = useMemo(() => examData?.config || DEFAULT_CONFIG, [examData]);

  const {
    currentQuestionIndex,
    answers,
    lastViolation,
    setLastViolation,
    handleAnswerChange,
    handlePreviousQuestion,
    handleNextQuestion,
    answeredCount,
    questionTimeDisplay,
    hasQuestionTimer,
  } = useExamSession({
    totalQuestions: examData?.questions.length || 0,
    minutesPerQuestion: examData?.minutesPerQuestion || 0,
    onQuestionTimeUp: (questionIndex) => {
      // Mark the current question answer as 0 (unanswered) when time runs out
      const currentQuestion = examData?.questions[questionIndex];
      if (currentQuestion && !answers[currentQuestion.id]) {
        // Question is already unanswered, timer just expired
        console.log(`Question ${questionIndex} time expired - no answer marked`);
      }
    },
  });

  const { timeLeft, formatTime } = useExamTimer({
    enabled: !!examData,
    durationMinutes: examData?.duration || 0,
    onTimeUp: () => {},
  });

  useFullscreenMode({ enabled: !!examData });

  const thresholdHandlerRef = useRef<(action: string) => void>(() => {});

  const { reportViolation } = useExamViolationReporting(examId, {
    onThresholdReached: (action) => thresholdHandlerRef.current(action),
  });

  const { violations, metrics } = useExamSecurityMonitoring({
    enabled: !!examData,
    config: examConfig,
    onViolation: (violation) => {
      setLastViolation(violation);
      reportViolation(violation);
    },
  });

  const { handleSubmitExam, handleThresholdReached } = useExamHandlers({
    answers,
    violations,
    examId,
  });

  useEffect(() => {
    thresholdHandlerRef.current = handleThresholdReached;
  }, [handleThresholdReached]);

  useThresholdEnforcement({
    enabled: !!examData,
    totalViolations: metrics.totalViolations,
    config: examConfig,
    onThresholdReached: handleThresholdReached,
  });

  if (authLoading || !isAuthenticated || isLoading) {
    return <ExamLoadingState />;
  }

  if (error || !examData) {
    return <ExamErrorState error={error ?? undefined} />;
  }

  const currentQuestion = examData.questions[currentQuestionIndex];

  return (
    <ExamContent
      title={examData.title}
      currentQuestion={currentQuestion}
      currentQuestionIndex={currentQuestionIndex}
      totalQuestions={examData.questions.length}
      timeLeft={timeLeft}
      formatTime={formatTime}
      totalViolations={metrics.totalViolations}
      violationThreshold={examConfig.violationThreshold}
      config={examConfig}
      selectedAnswer={answers[currentQuestion.id]}
      answeredCount={answeredCount}
      lastViolation={lastViolation}
      questionTimeDisplay={questionTimeDisplay}
      hasQuestionTimer={hasQuestionTimer}
      onAnswerChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
      onPrevious={handlePreviousQuestion}
      onNext={handleNextQuestion}
      onSubmit={handleSubmitExam}
      onCloseViolationModal={() => setLastViolation(null)}
    />
  );
}

const ExamPage = memo(ExamPageComponent);
export default ExamPage;
