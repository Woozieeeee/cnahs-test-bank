"use client";

import { useMemo, useState } from "react";

import { useParams } from "next/navigation";

import PageContainer from "@/components/layout/pages/pageContainer";

import BackButton from "@/components/common/backButton";

import Pagination from "@/components/common/pagination";

import QuestionBankHeader from "@/components/admin/academic/subjects/question-bank/questionBankHeader";

import QuestionBankStats from "@/components/admin/academic/subjects/question-bank/questionBankStats";

import QuestionBankFilters from "@/components/admin/academic/subjects/question-bank/questionBankFilters";

import QuestionBankTable from "@/components/admin/academic/subjects/question-bank/questionBankTable";

import useSubjectQuestions from "@/hooks/useSubjectQuestions";

import useSubjectQuestionStats from "@/hooks/useSubjectQuestionStats";

import useSubject from "@/hooks/useSubject";

import LoadingState from "@/components/common/states/loadingState";

import ErrorState from "@/components/common/states/errorState";

import NotFoundState from "@/components/common/states/notFoundState";

export default function SubjectQuestionBankPage() {
  const params = useParams();

  const subjectId = Number(params.subjectId);

  const { subject, loading, error, refresh } =
    useSubject(subjectId);

  const {
    questions,
    loading: questionsLoading,
    error: questionsError,
    refresh: refreshQuestions,
  } = useSubjectQuestions(subjectId);

  const {
    stats,
    loading: statsLoading,
    error: statsError,
  } = useSubjectQuestionStats(subjectId);

  const [search, setSearch] = useState("");

  const [topic, setTopic] = useState("");

  const [difficulty, setDifficulty] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  // =========================
  // TOPICS
  // =========================

  const topics = useMemo(() => {
    return Array.from(
      new Set(questions.map((question) => question.topic))
    );
  }, [questions]);

  // =========================
  // FILTERING
  // =========================

  const filteredQuestions = useMemo(() => {
    let result = [...questions];

    if (search.trim()) {
      result = result.filter((question) =>
        question.topic
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (topic) {
      result = result.filter(
        (question) => question.topic === topic
      );
    }

    if (difficulty) {
      result = result.filter(
        (question) => question.difficulty === difficulty
      );
    }

    return result;
  }, [questions, search, topic, difficulty]);

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    filteredQuestions.length / pageSize
  );

  const paginatedQuestions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;

    return filteredQuestions.slice(start, start + pageSize);
  }, [filteredQuestions, currentPage]);

  // =========================
  // LOADING
  // =========================

  if (loading || questionsLoading || statsLoading) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading question bank..."
          description="Please wait while we retrieve subject questions."
        />
      </PageContainer>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error || questionsError || statsError) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load question bank."
          description={
            error || questionsError || statsError || ""
          }
          onRetry={refresh}
        />
      </PageContainer>
    );
  }

  // =========================
  // NOT FOUND
  // =========================

  if (!subject) {
    return (
      <PageContainer>
        <NotFoundState
          title="Subject not found."
          description="The requested subject may have been removed."
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackButton
        href={`/admin/academic/subjects/${subjectId}`}
        label="Back to Subject"
      />

      <QuestionBankHeader
        subjectName={subject.name}
        subjectCode={subject.code}
      />

      <QuestionBankStats
        totalQuestions={stats?.totalQuestions ?? 0}
        totalTopics={stats?.totalTopics ?? 0}
        weakQuestions={stats?.weakQuestions ?? 0}
        averageSuccessRate={stats?.averageSuccessRate ?? 0}
      />

      <QuestionBankFilters
        search={search}
        setSearch={setSearch}
        topic={topic}
        setTopic={setTopic}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        topics={topics}
      />

      <QuestionBankTable
        subjectId={subjectId}
        questions={paginatedQuestions}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </PageContainer>
  );
}
