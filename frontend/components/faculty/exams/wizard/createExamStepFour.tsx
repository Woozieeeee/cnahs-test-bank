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
  const [examInfoOpen, setExamInfoOpen] = useState(false);
  const [enabledRulesOpen, setEnabledRulesOpen] =
    useState(false);
  const [selectedQuestionsOpen, setSelectedQuestionsOpen] =
    useState(false);

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
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Title:</span>{" "}
                {info.title}
              </p>

              <p>
                <span className="font-medium">
                  Description:
                </span>{" "}
                {info.description || "-"}
              </p>

              {sectionNames && (
                <p>
                  <span className="font-medium">
                    Section:
                  </span>{" "}
                  {sectionNames}
                </p>
              )}

              <p>
                <span className="font-medium">
                  Exam Code:
                </span>{" "}
                {info.examCode}
              </p>

              <p>
                <span className="font-medium">
                  Duration:
                </span>{" "}
                {info.duration} mins
              </p>

              <p>
                <span className="font-medium">
                  Passing Score:
                </span>{" "}
                {info.passingScore}%
              </p>

              <p>
                <span className="font-medium">Starts:</span>{" "}
                {info.startsAt}
              </p>

              <p>
                <span className="font-medium">Ends:</span>{" "}
                {info.endsAt}
              </p>
            </div>
          </RuleSection>

          <RuleSection
            title="Enabled Rules"
            description="Active exam protections and settings."
            collapsible
            isOpen={enabledRulesOpen}
            onToggle={() =>
              setEnabledRulesOpen(!enabledRulesOpen)
            }
          >
            <div className="space-y-2 text-sm">
              {enabledRules.map((rule) => (
                <div key={rule}>✓ {rule}</div>
              ))}
            </div>
          </RuleSection>

          <RuleSection
            title="Selected Questions"
            description={`${selectedQuestions.length} questions included.`}
            collapsible
            isOpen={selectedQuestionsOpen}
            onToggle={() =>
              setSelectedQuestionsOpen(
                !selectedQuestionsOpen
              )
            }
          >
            <div className="max-h-80 space-y-2 overflow-y-auto">
              {selectedQuestions.map((question, index) => (
                <div
                  key={question.id}
                  className="border-border rounded-xl border p-3"
                >
                  <p className="text-muted-foreground text-xs">
                    #{index + 1}
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {question.question}
                  </p>

                  <p className="text-muted-foreground mt-1 text-xs">
                    {question.topicName}
                  </p>
                </div>
              ))}
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
