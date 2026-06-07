"use client";

import { memo } from "react";

import QuestionBuilderFilters from "../question-builder/questionBuilderFilters";
import SelectedQuestionsPanel from "../question-builder/selectedQuestionsPanel";
import AvailableQuestionsPanel from "../question-builder/availableQuestionsPanel";

import type { ExamBuilderQuestion } from "@/types/exams/createExam";

interface Props {
  search: string;

  setSearch: (value: string) => void;

  topic: string;

  setTopic: (value: string) => void;

  topics: string[];

  suggestions: string[];

  questionLimit: number;

  selectedQuestions: ExamBuilderQuestion[];

  filteredQuestions: ExamBuilderQuestion[];

  onAddQuestion: (question: ExamBuilderQuestion) => void;

  onRemoveQuestion: (questionId: number) => void;

  onMoveUp: (questionId: number) => void;

  onMoveDown: (questionId: number) => void;
}

function CreateExamStepOne({
  search,
  setSearch,
  topic,
  setTopic,
  topics,
  suggestions,
  questionLimit,
  selectedQuestions,
  filteredQuestions,
  onAddQuestion,
  onRemoveQuestion,
  onMoveUp,
  onMoveDown,
}: Props) {
  return (
    <div className="space-y-4">
      <QuestionBuilderFilters
        search={search}
        setSearch={setSearch}
        topic={topic}
        setTopic={setTopic}
        topics={topics}
        suggestions={suggestions}
      />

      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <SelectedQuestionsPanel
          questions={selectedQuestions}
          questionLimit={questionLimit}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onRemove={onRemoveQuestion}
        />

        <AvailableQuestionsPanel
          questions={filteredQuestions}
          selectedQuestionIds={selectedQuestions.map(
            (question) => question.id
          )}
          selectedCount={selectedQuestions.length}
          questionLimit={questionLimit}
          onAdd={onAddQuestion}
        />
      </div>
    </div>
  );
}

export default memo(CreateExamStepOne);
