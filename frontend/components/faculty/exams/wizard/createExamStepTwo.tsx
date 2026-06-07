"use client";

import { memo, useState } from "react";
import ToggleField from "@/components/common/forms/toggleField";
import RuleSection from "./ruleSection";
import type { CreateExamRules } from "@/types/exams/createExamRules";
import SecuritySummaryCard from "./securitySummaryCard";

interface Props {
  rules: CreateExamRules;

  setRules: React.Dispatch<
    React.SetStateAction<CreateExamRules>
  >;
}

function CreateExamStepTwo({ rules, setRules }: Props) {
  const [examBehaviorOpen, setExamBehaviorOpen] =
    useState(false);
  const [securityOpen, setSecurityOpen] = useState(false);

  const updateRule = (
    key: keyof CreateExamRules,
    value: any
  ) => {
    setRules((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
      <div className="space-y-4">
        {/* EXAM BEHAVIOR */}

        <RuleSection
          title="Exam Behavior"
          description="Control how results and questions are presented."
          collapsible
          isOpen={examBehaviorOpen}
          onToggle={() =>
            setExamBehaviorOpen(!examBehaviorOpen)
          }
        >
          <ToggleField
            label="Randomize Questions"
            checked={rules.randomizeQuestions}
            onChange={(value) =>
              updateRule("randomizeQuestions", value)
            }
          />

          <ToggleField
            label="Randomize Answers"
            checked={rules.randomizeAnswers}
            onChange={(value) =>
              updateRule("randomizeAnswers", value)
            }
          />

          <ToggleField
            label="Show Result Immediately"
            checked={rules.showResultAfterSubmission}
            onChange={(value) =>
              updateRule("showResultAfterSubmission", value)
            }
          />

          <ToggleField
            label="Reveal Correct Answers"
            checked={rules.showCorrectAnswers}
            onChange={(value) =>
              updateRule("showCorrectAnswers", value)
            }
          />

          <ToggleField
            label="Reveal Explanations"
            checked={rules.showExplanations}
            onChange={(value) =>
              updateRule("showExplanations", value)
            }
          />
        </RuleSection>

        {/* SECURITY */}

        <RuleSection
          title="Security & Focus Protection"
          description="Monitor and prevent suspicious exam behavior."
          collapsible
          isOpen={securityOpen}
          onToggle={() => setSecurityOpen(!securityOpen)}
        >
          <ToggleField
            label="Require Fullscreen"
            checked={rules.requireFullscreen}
            onChange={(value) =>
              updateRule("requireFullscreen", value)
            }
          />

          <ToggleField
            label="Detect Tab Switching"
            checked={rules.detectTabSwitch}
            onChange={(value) =>
              updateRule("detectTabSwitch", value)
            }
          />

          <ToggleField
            label="Detect Window Blur"
            checked={rules.detectWindowBlur}
            onChange={(value) =>
              updateRule("detectWindowBlur", value)
            }
          />

          <ToggleField
            label="Block Copy"
            checked={rules.blockCopy}
            onChange={(value) =>
              updateRule("blockCopy", value)
            }
          />

          <ToggleField
            label="Block Paste"
            checked={rules.blockPaste}
            onChange={(value) =>
              updateRule("blockPaste", value)
            }
          />

          <ToggleField
            label="Block Right Click"
            checked={rules.blockRightClick}
            onChange={(value) =>
              updateRule("blockRightClick", value)
            }
          />

          <ToggleField
            label="Detect Device Change"
            checked={rules.detectDeviceChange}
            onChange={(value) =>
              updateRule("detectDeviceChange", value)
            }
          />
        </RuleSection>

        {/* VIOLATIONS */}

        <RuleSection
          title="Violation Management"
          description="Configure how violations are handled."
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Violation Threshold
            </label>

            <select
              value={rules.violationThreshold}
              onChange={(e) =>
                updateRule(
                  "violationThreshold",
                  Number(e.target.value)
                )
              }
              className="border-border bg-card w-full rounded-xl border px-4 py-2"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Threshold Action
            </label>

            <select
              value={rules.thresholdAction}
              onChange={(e) =>
                updateRule(
                  "thresholdAction",
                  e.target.value
                )
              }
              className="border-border bg-card w-full rounded-xl border px-4 py-2"
            >
              <option value="AUTO_SUBMIT">
                Auto Submit Exam
              </option>

              <option value="END_EXAM">
                End Exam Immediately
              </option>

              <option value="FLAG_REVIEW">
                Flag For Review
              </option>
            </select>
          </div>
        </RuleSection>
      </div>
      <SecuritySummaryCard rules={rules} />
    </div>
  );
}

export default memo(CreateExamStepTwo);
