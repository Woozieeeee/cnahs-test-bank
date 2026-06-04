"use client";

import { useParams } from "next/navigation";
import PageContainer from "@/components/layout/pages/pageContainer";
import BackButton from "@/components/common/backButton";
import QuestionDetailsHeader from "@/components/admin/academic/sections/question-bank/details/questionDetailsHeader";
import QuestionDetailsStats from "@/components/admin/academic/sections/question-bank/details/questionDetailsStats";
import QuestionOverviewSection from "@/components/admin/academic/sections/question-bank/details/questionOverviewSection";
import QuestionAssessmentPerformance from "@/components/admin/academic/sections/question-bank/details/questionAssessmentPerformance";
import QuestionAnswerDistribution from "@/components/admin/academic/sections/question-bank/details/questionAnswerDistribution";
import { mockQuestionDetails } from "@/components/admin/academic/sections/data/mockQuestionDetails";

export default function QuestionDetailsPage() {
  const params = useParams();

  const sectionId = Number(params.id);

  const question = mockQuestionDetails;

  return (
    <PageContainer>
      <BackButton
        href={`/admin/academic/sections/${sectionId}/question-bank`}
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

      {/* LOWER ANALYTICS */}

      <div className="grid gap-6 xl:grid-cols-2">
        <QuestionAssessmentPerformance
          {...question.assessmentPerformance}
        />

        <QuestionAnswerDistribution
          answers={question.answerDistribution}
        />
      </div>
    </PageContainer>
  );
}
