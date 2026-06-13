"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PageContainer from "@/components/layout/pages/pageContainer";
import BackButton from "@/components/common/backButton";
import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";
import QuestionDetailsHeader from "@/components/admin/academic/sections/question-bank/details/questionDetailsHeader";
import QuestionDetailsStats from "@/components/admin/academic/sections/question-bank/details/questionDetailsStats";
import QuestionOverviewSection from "@/components/admin/academic/sections/question-bank/details/questionOverviewSection";
import QuestionAssessmentPerformance from "@/components/admin/academic/sections/question-bank/details/questionAssessmentPerformance";
import QuestionAnswerDistribution from "@/components/admin/academic/sections/question-bank/details/questionAnswerDistribution";
import { getQuestionDetails } from "@/services/admin_service";

interface QuestionDetails {
  question: {
    id: number;
    text: string;
    topic: string;
    difficulty: string;
    options: Array<{ id: number; optionText: string; isCorrect: boolean }>;
    explanation: string;
  };
  exams: Array<{ id: number; title: string; section: { id: number; name: string } }>;
  performance: {
    totalAttempts: number;
    correctAttempts: number;
    incorrectAttempts: number;
    successRate: number;
    attemptsByStatus: { correct: number; incorrect: number };
  };
  recentAttempts: Array<{ id: number; studentName: string; isCorrect: boolean }>;
}

export default function QuestionDetailsPage() {
  const params = useParams();

  const sectionId = Number(params.id);
  const questionId = Number(params.questionId);

  const [question, setQuestion] = useState<QuestionDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setLoading(true);
        setError(undefined);

        const response = await getQuestionDetails(questionId);
        if (response.success) {
          setQuestion(response.data);
        } else {
          setError("Failed to load question details");
        }
      } catch (err) {
        console.error("Error fetching question:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch question");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [questionId]);

  if (loading) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading question..."
          description="Please wait while we retrieve the question details."
        />
      </PageContainer>
    );
  }

  if (error || !question) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load question."
          description={error || "Question not found"}
          onRetry={() => window.location.reload()}
        />
      </PageContainer>
    );
  }

  const correctCount = question.performance.correctAttempts;
  const incorrectCount = question.performance.incorrectAttempts;

  return (
    <PageContainer>
      <BackButton
        href={`/admin/academic/sections/${sectionId}/question-bank`}
        label="Back to Question Bank"
      />

      <QuestionDetailsHeader
        id={question.question.id}
        topic={question.question.topic}
        difficulty={question.question.difficulty}
      />

      <QuestionDetailsStats
        successRate={question.performance.successRate}
        attempts={question.performance.totalAttempts}
        assessmentsUsed={question.exams.length}
        averageTime="N/A" // Not available in backend response
      />

      <QuestionOverviewSection
        question={question.question.text}
        topic={question.question.topic}
        difficulty={question.question.difficulty}
        correct={correctCount}
        incorrect={incorrectCount}
        blockedStudents={{ easy: 0, medium: 0, hard: 0, expert: 0 }}
      />

      {/* LOWER ANALYTICS */}

      <div className="grid gap-6 xl:grid-cols-2">
        <QuestionAssessmentPerformance
          totalAssessments={question.exams.length}
          averageSuccessRate={question.performance.successRate}
          highestSuccessRate={100}
          lowestSuccessRate={0}
          mostUsedAssessment={question.exams[0]?.title || "N/A"}
          coverage={{ mocks: 0, quizzes: 0, midterms: 0, finals: 0 }}
        />

        <QuestionAnswerDistribution
          answers={question.question.options.map((opt, idx) => ({
            choice: String.fromCharCode(65 + idx), // A, B, C, D, etc.
            answer: opt.optionText,
            count: 0, // Not available in backend
            correct: opt.isCorrect,
          }))}
        />
      </div>
    </PageContainer>
  );
}
