"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import PageContainer from "@/components/layout/pages/pageContainer";

import BackButton from "@/components/common/backButton";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";

import useSubjectQuestionBank from "@/hooks/useSubjectQuestionBank";

import QuestionBankAnalyticsStats from "@/components/faculty/question-bank/questionBankAnalyticsStats";
import WeakQuestionsTable from "@/components/faculty/question-bank/weakQuestionsTable";
import DifficultyDistribution from "@/components/faculty/question-bank/difficultyDistribution";
import QuestionPerformanceTabs from "@/components/faculty/question-bank/questionPerformanceTabs";
import StrongQuestionsTable from "@/components/faculty/question-bank/strongQuestionsTable";

export default function FacultySubjectQuestionBankPage() {
  const params = useParams();

  const subjectId = Number(params.subjectId);

  const { data, loading, error, refresh } =
    useSubjectQuestionBank(subjectId);

  const [activeTab, setActiveTab] = useState<
    "WEAK" | "STRONG"
  >("WEAK");

  if (loading) {
    console.log(data);
    return (
      <PageContainer>
        <LoadingState
          title="Loading Question Bank..."
          description="Please wait while we retrieve analytics."
        />
      </PageContainer>
    );
  }

  if (error || !data) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load question bank."
          description={error}
          onRetry={refresh}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackButton
        href={`/faculty/subjects/${subjectId}`}
        label="Back to Subject"
      />

      <h1 className="text-3xl font-bold">
        Question Bank Analytics
      </h1>

      <p className="text-muted-foreground mt-2">
        Monitor question quality, topic coverage, and
        student performance.
      </p>

      <QuestionBankAnalyticsStats
        totalQuestions={data.totalQuestions}
        totalTopics={data.totalTopics}
        weakQuestions={data.weakQuestionCount}
        averageSuccessRate={data.averageSuccessRate}
      />

      <DifficultyDistribution
        distribution={data.difficultyDistribution}
      />

      <QuestionPerformanceTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "WEAK" ? (
        <WeakQuestionsTable
          questions={data.weakQuestions}
        />
      ) : (
        <StrongQuestionsTable
          questions={data.strongQuestions}
        />
      )}
    </PageContainer>
  );
}
