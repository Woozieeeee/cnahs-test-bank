"use client";

import { useMemo, useState } from "react";

import { useParams } from "next/navigation";

import PageContainer from "@/components/layout/pages/pageContainer";

import BackButton from "@/components/common/backButton";

import Pagination from "@/components/common/pagination";

import QuestionBankHeader from "@/components/admin/academic/sections/question-bank/questionBankHeader";
import QuestionBankStats from "@/components/admin/academic/sections/question-bank/questionBankStats";
import QuestionBankAnalytics from "@/components/admin/academic/sections/question-bank/questionBankAnalytics";
import QuestionBankFilters from "@/components/admin/academic/sections/question-bank/questionBankFilters";
import QuestionBankTabs from "@/components/admin/academic/sections/question-bank/questionBankTabs";
import QuestionBankTable from "@/components/admin/academic/sections/question-bank/questionBankTable";

import { mockQuestionBank } from "@/components/admin/academic/sections/data/mockQuestionBank";

import { mockQuestionAnalytics } from "@/components/admin/academic/sections/data/mockQuestionAnalytics";

export default function QuestionBankPage() {
  const params = useParams();

  const sectionId = Number(params.id);

  const [search, setSearch] = useState("");

  const [topic, setTopic] = useState("ALL");

  const [sort, setSort] = useState("FAILED");

  const [activeTab, setActiveTab] = useState("ALL");

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  const topics = useMemo(() => {
    return Array.from(
      new Set(
        mockQuestionBank.map((question) => question.topic)
      )
    );
  }, []);

  const filteredQuestions = useMemo(() => {
    let result = [...mockQuestionBank];

    if (search.trim()) {
      result = result.filter((question) =>
        question.question
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (topic !== "ALL") {
      result = result.filter(
        (question) => question.topic === topic
      );
    }

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
        result.sort((a, b) => b.attempts - a.attempts);
        break;
    }

    return result;
  }, [search, topic, sort, activeTab]);

  const totalPages = Math.ceil(
    filteredQuestions.length / pageSize
  );

  const paginatedQuestions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;

    return filteredQuestions.slice(start, start + pageSize);
  }, [filteredQuestions, currentPage]);

  return (
    <PageContainer>
      <BackButton
        href={`/admin/academic/sections/${sectionId}`}
        label="Back to Section"
      />

      <QuestionBankHeader />

      <QuestionBankStats
        totalQuestions={
          mockQuestionAnalytics.totalQuestions
        }
        totalTopics={mockQuestionAnalytics.totalTopics}
        weakestQuestions={
          mockQuestionAnalytics.weakestQuestions
        }
        averageSuccessRate={
          mockQuestionAnalytics.averageSuccessRate
        }
      />

      <QuestionBankAnalytics
        analytics={mockQuestionAnalytics}
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

      <QuestionBankTable
        sectionId={sectionId}
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
