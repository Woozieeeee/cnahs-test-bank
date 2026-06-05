"use client";

import { useParams } from "next/navigation";
import PageContainer from "@/components/layout/pages/pageContainer";
import BackButton from "@/components/common/backButton";
import QuestionDetailsHeader from "@/components/admin/academic/sections/question-bank/details/questionDetailsHeader";
import QuestionDetailsStats from "@/components/admin/academic/sections/question-bank/details/questionDetailsStats";
import QuestionOverviewSection from "@/components/admin/academic/sections/question-bank/details/questionOverviewSection";
import QuestionAnswerDistribution from "@/components/admin/academic/sections/question-bank/details/questionAnswerDistribution";
import useQuestionDetails from "@/hooks/faculty/questions/useQuestionDetails";
import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";
import NotFoundState from "@/components/common/states/notFoundState";

export default function SubjectQuestionDetailsPage() {
  const params = useParams();

  const subjectId = Number(params.subjectId);

  const questionId = Number(params.questionId);

  // later:
  // find question by id

  const { question, loading, error, refresh } =
    useQuestionDetails(questionId);

  if (loading) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading question..."
          description="Please wait while we retrieve question information."
        />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load question."
          description={error}
          onRetry={refresh}
        />
      </PageContainer>
    );
  }

  if (!question) {
    return (
      <PageContainer>
        <NotFoundState
          title="Question not found."
          description="The requested question may have been removed."
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackButton
        href={`/admin/academic/subjects/${subjectId}/question-bank`}
        label="Back to Question Bank"
      />

      <QuestionDetailsHeader
        id={question.id}
        topic={question.topic}
        difficulty={question.difficulty}
      />

      <QuestionDetailsStats
        successRate={question.successRate}
        attempts={question.attempts}
        assessmentsUsed={question.assessmentsUsed}
        averageTime={question.averageTime}
      />

      <QuestionOverviewSection
        question={question.question}
        topic={question.topic}
        difficulty={question.difficulty}
        correct={question.correct}
        incorrect={question.incorrect}
        blockedStudents={question.blockedStudents}
      />

      <QuestionAnswerDistribution
        answers={question.answerDistribution}
      />
    </PageContainer>
  );
}
