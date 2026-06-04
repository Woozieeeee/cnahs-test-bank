"use client";

import { useMemo, useState } from "react";

import { useParams } from "next/navigation";

import PageContainer from "@/components/layout/pages/pageContainer";

import BackButton from "@/components/common/backButton";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";

import Pagination from "@/components/common/pagination";

import useFacultyQuestions from "@/hooks/useFacultyQuestions";

import QuestionBankHeader from "@/components/faculty/questions/questionBankHeader";
import QuestionBankStats from "@/components/faculty/questions/questionBankStats";
import QuestionBankFilters from "@/components/faculty/questions/questionBankFilters";
import QuestionTable from "@/components/faculty/questions/questionTable";

import CreateQuestionModal from "@/components/faculty/questions/modals/createQuestionModal";
import UpdateQuestionModal from "@/components/faculty/questions/modals/updateQuestionModal";
import QuestionUploadCsvModal from "@/components/faculty/questions/modals/questionUploadCsvModal";
import ImportHistoryModal from "@/components/faculty/questions/modals/importHistoryModal";
import { downloadQuestionTemplate } from "@/services/faculty_service";

import DependencyModal from "@/components/common/modal/dependencyModal";

import useQuestionImportHistory from "@/hooks/useQuestionImportHistory";

import { FacultyQuestion } from "@/types/facultyQuestion";

import {
  archiveFacultyQuestion,
  restoreFacultyQuestion,
} from "@/services/faculty_service";

import { successToast, errorToast } from "@/lib/swal";

export default function FacultyQuestionBankPage() {
  const params = useParams();

  const subjectId = Number(params.subjectId);

  const topicId = Number(params.topicId);

  const {
    questions,
    loading,
    error,

    addQuestion,
    updateQuestion,

    archiveQuestion,
    restoreQuestion,

    refresh,
  } = useFacultyQuestions(topicId);

  const [search, setSearch] = useState("");

  const [difficulty, setDifficulty] = useState("ALL");

  const [status, setStatus] = useState("ALL");

  const [currentPage, setCurrentPage] = useState(1);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [showUploadModal, setShowUploadModal] =
    useState(false);

  const [showHistoryModal, setShowHistoryModal] =
    useState(false);

  const { history, refresh: refreshHistory } =
    useQuestionImportHistory(topicId);

  const [selectedQuestion, setSelectedQuestion] =
    useState<FacultyQuestion | null>(null);

  const [dependencyData, setDependencyData] =
    useState<any>(null);

  const ITEMS_PER_PAGE = 10;

  const handleArchive = async (questionId: number) => {
    try {
      await archiveFacultyQuestion(questionId);

      archiveQuestion(questionId);

      successToast("Question archived successfully.");
    } catch (error: any) {
      if (error.response?.data?.dependencies) {
        setDependencyData(error.response.data.dependencies);

        return;
      }

      errorToast(
        error.response?.data?.message ||
          "Failed to archive question."
      );
    }
  };

  const handleRestore = async (questionId: number) => {
    try {
      await restoreFacultyQuestion(questionId);

      restoreQuestion(questionId);

      successToast("Question restored successfully.");
    } catch (error: any) {
      errorToast(
        error.response?.data?.message ||
          "Failed to restore question."
      );
    }
  };

  const filteredQuestions = useMemo(() => {
    let result = [...questions];

    if (search.trim()) {
      result = result.filter((question) =>
        question.question
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (difficulty !== "ALL") {
      result = result.filter(
        (question) => question.difficulty === difficulty
      );
    }

    if (status === "ACTIVE") {
      result = result.filter(
        (question) => !question.isArchived
      );
    }

    if (status === "ARCHIVED") {
      result = result.filter(
        (question) => question.isArchived
      );
    }

    return result;
  }, [questions, search, difficulty, status]);

  const totalPages =
    Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE) ||
    1;

  const paginatedQuestions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredQuestions.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [filteredQuestions, currentPage]);

  const easyCount = questions.filter(
    (q) => q.difficulty === "EASY"
  ).length;

  const mediumCount = questions.filter(
    (q) => q.difficulty === "MEDIUM"
  ).length;

  const hardCount = questions.filter(
    (q) => q.difficulty === "HARD"
  ).length;

  const expertCount = questions.filter(
    (q) => q.difficulty === "EXPERT"
  ).length;

  if (loading) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading questions..."
          description="Please wait while we retrieve question bank data."
        />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load questions."
          description={error}
          onRetry={refresh}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackButton
        href={`/faculty/subjects/${subjectId}/topics`}
        label="Back to Topics"
      />

      <QuestionBankHeader
        onCreate={() => setShowCreateModal(true)}
        onUploadCsv={() => setShowUploadModal(true)}
        onHistory={() => setShowHistoryModal(true)}
        onDownloadTemplate={() =>
          downloadQuestionTemplate(topicId)
        }
      />

      <QuestionBankStats
        total={questions.length}
        easy={easyCount}
        medium={mediumCount}
        hard={hardCount}
        expert={expertCount}
      />

      <QuestionBankFilters
        search={search}
        setSearch={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
        difficulty={difficulty}
        setDifficulty={(value) => {
          setDifficulty(value);
          setCurrentPage(1);
        }}
        status={status}
        setStatus={(value) => {
          setStatus(value);
          setCurrentPage(1);
        }}
      />

      <QuestionTable
        questions={paginatedQuestions}
        onEdit={(question) => setSelectedQuestion(question)}
        onArchive={handleArchive}
        onRestore={handleRestore}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <CreateQuestionModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        topicId={topicId}
        onSuccess={addQuestion}
      />

      <QuestionUploadCsvModal
        open={showUploadModal}
        topicId={topicId}
        onClose={() => setShowUploadModal(false)}
        onSuccess={() => {
          refresh();

          refreshHistory();
        }}
      />

      <ImportHistoryModal
        open={showHistoryModal}
        history={history}
        onClose={() => setShowHistoryModal(false)}
      />

      <UpdateQuestionModal
        open={!!selectedQuestion}
        question={selectedQuestion}
        onClose={() => setSelectedQuestion(null)}
        onSuccess={(updatedQuestion) => {
          updateQuestion(updatedQuestion);

          setSelectedQuestion(null);
        }}
      />

      <DependencyModal
        open={!!dependencyData}
        dependencies={dependencyData}
        onClose={() => setDependencyData(null)}
      />
    </PageContainer>
  );
}
