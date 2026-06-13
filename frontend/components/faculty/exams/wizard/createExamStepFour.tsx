"use client";

import { memo, useState } from "react";

import RuleSection from "./ruleSection";

import ExamCreationSummaryCard from "./examCreationSummaryCard";

import type { CreateExamInfo } from "@/types/exams/createExamInfo";
import type { CreateExamRules } from "@/types/exams/createExamRules";
import type { ExamBuilderQuestion } from "@/types/exams/createExam";

interface Props {
  info: CreateExamInfo;

  rules: CreateExamRules;

  selectedQuestions: ExamBuilderQuestion[];

  questionLimit: number;

  examLevel: string;

  sectionNames?: string;
}

function CreateExamStepFour({
  info,
  rules,
  selectedQuestions,
  questionLimit,
  examLevel,
  sectionNames,
}: Props) {
  const [examInfoOpen, setExamInfoOpen] = useState(true);
  const [enabledRulesOpen, setEnabledRulesOpen] =
    useState(true);
  const [selectedQuestionsOpen, setSelectedQuestionsOpen] =
    useState(true);

  // Calculate duration from start and end times
  const calculateDuration = () => {
    if (!info.startsAt || !info.endsAt) return "-";
    try {
      const start = new Date(info.startsAt).getTime();
      const end = new Date(info.endsAt).getTime();
      if (end <= start) return "-";
      const minutes = Math.round((end - start) / (1000 * 60));
      return `${minutes} mins`;
    } catch {
      return "-";
    }
  };

  // Format datetime for display
  const formatDateTime = (dateStr: string) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toLocaleString();
    } catch {
      return dateStr;
    }
  };

  const enabledRules = [
    rules.randomizeQuestions && "Randomize Questions",

    rules.randomizeAnswers && "Randomize Answers",

    rules.showResultAfterSubmission &&
      "Show Result After Submission",

    rules.showCorrectAnswers && "Show Correct Answers",

    rules.showExplanations && "Show Explanations",

    rules.requireFullscreen && "Require Fullscreen",

    rules.detectTabSwitch && "Detect Tab Switching",

    rules.detectWindowBlur && "Detect Window Blur",

    rules.blockCopy && "Block Copy",

    rules.blockPaste && "Block Paste",

    rules.blockRightClick && "Block Right Click",

    rules.detectDeviceChange && "Detect Device Change",
  ].filter((rule): rule is string => Boolean(rule));

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">
          Ready to Create
        </h2>

        <p className="text-muted-foreground mt-1 text-sm">
          Review all information before publishing this
          exam.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <RuleSection
            title="Exam Information"
            description="Assessment details."
            collapsible
            isOpen={examInfoOpen}
            onToggle={() => setExamInfoOpen(!examInfoOpen)}
          >
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Title</p>
                <p className="font-medium">{info.title}</p>
              </div>

              {info.description && (
                <div>
                  <p className="text-muted-foreground text-xs">Description</p>
                  <p className="line-clamp-2">{info.description}</p>
                </div>
              )}

              {sectionNames && (
                <div>
                  <p className="text-muted-foreground text-xs">Assigned Sections</p>
                  <p className="font-medium text-xs">{sectionNames}</p>
                </div>
              )}

              <div>
                <p className="text-muted-foreground text-xs">Exam Code</p>
                <p className="font-mono text-sm">{info.examCode}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-muted-foreground text-xs">Difficulty</p>
                  <p className="font-medium">{examLevel}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Passing Score</p>
                  <p className="font-medium">{info.passingScore}%</p>
                </div>
              </div>

              <div>
                <p className="text-muted-foreground text-xs">Exam Duration</p>
                <p className="font-medium">{calculateDuration()}</p>
              </div>

              <div>
                <p className="text-muted-foreground text-xs">Question Timer</p>
                <p className="font-medium">
                  {info.minutesPerQuestion === 0 
                    ? "No timer (0:0)" 
                    : `${info.minutesPerQuestion} min${info.minutesPerQuestion !== 1 ? "s" : ""}/question`}
                </p>
              </div>

              <div className="border-border border-t pt-3 space-y-2">
                <div>
                  <p className="text-muted-foreground text-xs">Starts</p>
                  <p className="text-xs">{formatDateTime(info.startsAt)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Ends</p>
                  <p className="text-xs">{formatDateTime(info.endsAt)}</p>
                </div>
              </div>
            </div>
          </RuleSection>

          <RuleSection
            title="Enabled Rules"
            description={`${enabledRules.length} active exam protections and settings.`}
            collapsible
            isOpen={enabledRulesOpen}
            onToggle={() =>
              setEnabledRulesOpen(!enabledRulesOpen)
            }
          >
            {enabledRules.length > 0 ? (
              <div className="grid gap-2 text-sm">
                {enabledRules.map((rule) => (
                  <div key={rule} className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No additional rules enabled
              </p>
            )}
          </RuleSection>

          <RuleSection
            title="Selected Questions"
            description={`${selectedQuestions.length} of ${questionLimit} questions included.`}
            collapsible
            isOpen={selectedQuestionsOpen}
            onToggle={() =>
              setSelectedQuestionsOpen(
                !selectedQuestionsOpen
              )
            }
          >
            <div className="max-h-96 space-y-2 overflow-y-auto pr-2">
              {selectedQuestions.length > 0 ? (
                selectedQuestions.map((question, index) => (
                  <div
                    key={question.id}
                    className="border-border bg-muted/50 rounded-lg border p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-muted-foreground text-xs font-medium">
                          Question {index + 1}
                        </p>

                        <p className="mt-1 text-sm font-medium line-clamp-2">
                          {question.question}
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                          <span className="bg-primary/10 text-primary rounded px-2 py-0.5 text-xs font-medium">
                            {question.topicName}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm text-center py-4">
                  No questions selected
                </p>
              )}
            </div>
          </RuleSection>
        </div>

        <ExamCreationSummaryCard
          info={info}
          rules={rules}
          examLevel={examLevel}
          questionLimit={questionLimit}
        />
      </div>
    </div>
  );
}

export default memo(CreateExamStepFour);
