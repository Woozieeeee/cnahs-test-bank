"use client";

import { useMemo, useState, useEffect } from "react";

import { useParams } from "next/navigation";

import PageContainer from "@/components/layout/pages/pageContainer";

import BackButton from "@/components/common/backButton";

import Pagination from "@/components/common/pagination";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";
import EmptyState from "@/components/common/states/emptyState";

import QuestionBankHeader from "@/components/admin/academic/sections/question-bank/questionBankHeader";
import QuestionBankStats from "@/components/admin/academic/sections/question-bank/questionBankStats";
import QuestionBankAnalytics from "@/components/admin/academic/sections/question-bank/questionBankAnalytics";
import QuestionBankFilters from "@/components/admin/academic/sections/question-bank/questionBankFilters";
import QuestionBankTabs from "@/components/admin/academic/sections/question-bank/questionBankTabs";
import QuestionBankTable from "@/components/admin/academic/sections/question-bank/questionBankTable";

import { getQuestionBank } from "@/services/admin_service";

interface QuestionData {
  id: number;
  question: string;
  topic: string;
  difficulty: string;
  totalAttempts: number;
  successRate: number;
  passCount: number;
}

interface QuestionBankResponse {
  success: boolean;
  data: {
    section: { id: number; name: string };
    questions: QuestionData[];
    analytics: {
      totalQuestions: number;
      totalTopics: number;
      byTopic: Array<{ topic: string; count: number; averageSuccessRate: number }>;
      averageSuccessRate: number;
      weakestQuestions: Array<{ id: number; question: string; successRate: number; attempts: number }>;
    };
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export default function QuestionBankPage() {
  const params = useParams();

  const sectionId = Number(params.id);

  const [search, setSearch] = useState("");

  const [topic, setTopic] = useState("ALL");

  const [sort, setSort] = useState("FAILED");

  const [activeTab, setActiveTab] = useState("ALL");

  const [currentPage, setCurrentPage] = useState(1);

  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [analytics, setAnalytics] = useState<QuestionBankResponse["data"]["analytics"] | null>(null);
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const pageSize = 10;

  // =========================
  // FETCH QUESTIONS FROM API
  // =========================

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(undefined);

        const response = await getQuestionBank(sectionId, {
          topic: topic !== "ALL" ? topic : undefined,
          search: search.trim() || undefined,
          page: currentPage,
          limit: pageSize,
        }) as QuestionBankResponse;

        if (response.success) {
          setQuestions(response.data.questions);
          setAnalytics(response.data.analytics);
          setTopics(["ALL", ...response.data.analytics.byTopic.map((t) => t.topic)]);
        } else {
          setError("Failed to load questions");
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [sectionId, topic, search, currentPage]);

  // =========================
  // FILTERS
  // =========================

  const filteredQuestions = useMemo(() => {
    let result = [...questions];

    if (activeTab !== "ALL") {
      result = result.filter(
        (question) => question.difficulty === activeTab
      );
    }

    switch (sort) {
      case "FAILED":
        result.sort(
          (a, b) => a.successRate - b.successRate
        );
        break;

      case "PASSED":
        result.sort(
          (a, b) => b.successRate - a.successRate
        );
        break;

      case "ATTEMPTS":
        result.sort((a, b) => b.totalAttempts - a.totalAttempts);
        break;
    }

    return result;
  }, [questions, activeTab, sort]);

  const totalPages = useMemo(() => {
    return analytics ? analytics.totalQuestions / pageSize : 0;
  }, [analytics]);

  const paginatedQuestions = useMemo(() => {
    return filteredQuestions.slice(0, pageSize);
  }, [filteredQuestions]);

  // =========================
  // LOADING & ERROR STATES
  // =========================

  if (loading && !questions.length) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading questions..."
          description="Please wait while we retrieve the question bank."
        />
      </PageContainer>
    );
  }

  if (error && !analytics) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load questions."
          description={error}
          onRetry={() => window.location.reload()}
        />
      </PageContainer>
    );
  }

  if (!analytics) {
    return (
      <PageContainer>
        <EmptyState
          title="No questions found."
          description="There are no questions in this section yet."
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackButton
        href={`/admin/academic/sections/${sectionId}`}
        label="Back to Section"
      />

      <QuestionBankHeader />

      <QuestionBankStats
        totalQuestions={analytics.totalQuestions}
        totalTopics={analytics.totalTopics}
        weakestQuestions={analytics.weakestQuestions.length}
        averageSuccessRate={analytics.averageSuccessRate}
      />

      <QuestionBankAnalytics
        analytics={{
          distribution: {
            easy: filteredQuestions.filter((q) => q.difficulty === "EASY").length,
            medium: filteredQuestions.filter((q) => q.difficulty === "MEDIUM").length,
            hard: filteredQuestions.filter((q) => q.difficulty === "HARD").length,
            expert: filteredQuestions.filter((q) => q.difficulty === "EXPERT").length,
          },
          weakestTopics: analytics.byTopic
            .sort((a, b) => a.averageSuccessRate - b.averageSuccessRate)
            .slice(0, 5)
            .map((t) => ({
              topic: t.topic,
              score: t.averageSuccessRate,
            })),
        }}
      />

      <QuestionBankFilters
        search={search}
        setSearch={setSearch}
        topic={topic}
        setTopic={setTopic}
        sort={sort}
        setSort={setSort}
        topics={topics}
      />

      <QuestionBankTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {paginatedQuestions.length === 0 ? (
        <EmptyState
          title="No questions match your filters."
          description="Try adjusting your search or filters."
        />
      ) : (
        <>
          <QuestionBankTable
            sectionId={sectionId}
            questions={paginatedQuestions.map((q) => ({
              id: q.id,
              question: q.question,
              topic: q.topic,
              difficulty: q.difficulty,
              successRate: q.successRate,
              attempts: q.totalAttempts,
            }))}
          />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalPages)}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </PageContainer>
  );
}
