"use client";

import { memo } from "react";

import RuleSection from "./ruleSection";

import ExamSummaryCard from "./examSummaryCard";

import type { CreateExamInfo } from "@/types/exams/createExamInfo";

const getLocalDateTimeMin = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

interface SectionOption {
  id: number;

  name: string;
}

interface Props {
  info: CreateExamInfo;

  setInfo: React.Dispatch<
    React.SetStateAction<CreateExamInfo>
  >;

  questionLimit: number;

  examLevel: string;

  assignedSections: SectionOption[];
}

function CreateExamStepThree({
  info,
  setInfo,
  questionLimit,
  examLevel,
  assignedSections,
}: Props) {
  const selectedSections = assignedSections.filter(
    (section) => info.sectionIds.includes(section.id)
  );

  const handleSectionToggle = (sectionId: number) => {
    setInfo((previous) => ({
      ...previous,
      sectionIds: previous.sectionIds.includes(sectionId)
        ? previous.sectionIds.filter(
            (id) => id !== sectionId
          )
        : [...previous.sectionIds, sectionId],
    }));
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
      <div className="space-y-4">
        <RuleSection
          title="Exam Information"
          description="Basic assessment details."
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Select Sections
            </label>
            <div className="border-border bg-card grid max-h-40 gap-2 overflow-y-auto rounded-xl border p-3">
              {assignedSections.map((section) => (
                <label
                  key={section.id}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={info.sectionIds.includes(
                      section.id
                    )}
                    onChange={() =>
                      handleSectionToggle(section.id)
                    }
                    className="h-4 w-4"
                  />
                  <span>{section.name}</span>
                </label>
              ))}
            </div>
          </div>

          <input
            type="text"
            value={info.title}
            onChange={(e) =>
              setInfo((previous) => ({
                ...previous,
                title: e.target.value,
              }))
            }
            placeholder="Exam Title"
            className="border-border bg-card w-full rounded-xl border px-4 py-2"
          />

          <textarea
            rows={4}
            value={info.description}
            onChange={(e) =>
              setInfo((previous) => ({
                ...previous,
                description: e.target.value,
              }))
            }
            placeholder="Description"
            className="border-border bg-card w-full rounded-xl border px-4 py-2"
          />
        </RuleSection>

        <RuleSection
          title="Assessment Settings"
          description="Scoring and duration."
        >
          <input
            type="number"
            min={1}
            value={info.duration}
            onChange={(e) =>
              setInfo((previous) => ({
                ...previous,
                duration: Number(e.target.value),
              }))
            }
            className="border-border bg-card w-full rounded-xl border px-4 py-2"
          />

          <input
            type="number"
            min={1}
            max={100}
            value={info.passingScore}
            onChange={(e) =>
              setInfo((previous) => ({
                ...previous,
                passingScore: Number(e.target.value),
              }))
            }
            className="border-border bg-card w-full rounded-xl border px-4 py-2"
          />
        </RuleSection>

        <RuleSection
          title="Assignment & Schedule"
          description="Section assignment and exam schedule."
        >
          <input
            type="datetime-local"
            value={info.startsAt}
            min={getLocalDateTimeMin()}
            onChange={(e) =>
              setInfo((previous) => ({
                ...previous,
                startsAt: e.target.value,
              }))
            }
            className="border-border bg-card w-full rounded-xl border px-4 py-2"
          />

          <input
            type="datetime-local"
            value={info.endsAt}
            min={getLocalDateTimeMin()}
            onChange={(e) =>
              setInfo((previous) => ({
                ...previous,
                endsAt: e.target.value,
              }))
            }
            className="border-border bg-card w-full rounded-xl border px-4 py-2"
          />
        </RuleSection>
      </div>

      <ExamSummaryCard
        info={info}
        questionLimit={questionLimit}
        examLevel={examLevel}
        sectionNames={selectedSections
          .map((s) => s.name)
          .join(", ")}
      />
    </div>
  );
}

export default memo(CreateExamStepThree);
