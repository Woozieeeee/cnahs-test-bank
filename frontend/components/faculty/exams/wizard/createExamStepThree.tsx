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

  // Calculate suggested duration based on question count
  const calculateSuggestedDuration = (minutesPerQuestion: number) => {
    return questionLimit * minutesPerQuestion;
  };

  // Get current duration if times are set
  const getCurrentDuration = () => {
    if (info.startsAt && info.endsAt && new Date(info.endsAt) > new Date(info.startsAt)) {
      return Math.round((new Date(info.endsAt).getTime() - new Date(info.startsAt).getTime()) / (1000 * 60));
    }
    return null;
  };

  const currentDuration = getCurrentDuration();

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
          description="Scoring configuration."
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Passing Score (%)
            </label>
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
              placeholder="e.g., 70"
              className="border-border bg-card w-full rounded-xl border px-4 py-2"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Exam Code
            </label>
            <input
              type="text"
              value={info.examCode}
              readOnly
              className="border-border bg-muted text-muted-foreground w-full rounded-xl border px-4 py-2"
            />
            <p className="text-xs text-muted-foreground">
              Auto-generated unique identifier
            </p>
          </div>
        </RuleSection>

        <RuleSection
          title="Exam Schedule"
          description="When students can take this exam."
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Quick Duration Select
            </label>
            <div className="flex gap-2">
              {[30, 60, 90, 120].map((duration) => {
                const isSelected = (() => {
                  if (!info.startsAt || !info.endsAt) return false;
                  try {
                    const start = new Date(info.startsAt).getTime();
                    const end = new Date(info.endsAt).getTime();
                    const diff = Math.round((end - start) / (1000 * 60));
                    return diff === duration;
                  } catch {
                    return false;
                  }
                })();

                return (
                  <button
                    key={duration}
                    onClick={() => {
                      // Set start time to now if not already set
                      let startTime: Date;
                      if (info.startsAt) {
                        startTime = new Date(info.startsAt);
                      } else {
                        startTime = new Date();
                      }

                      // Calculate end time
                      const endTime = new Date(startTime.getTime() + duration * 60000);

                      // Format both times to datetime-local format (YYYY-MM-DDTHH:MM)
                      const formatDateTime = (date: Date) => {
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const day = String(date.getDate()).padStart(2, "0");
                        const hours = String(date.getHours()).padStart(2, "0");
                        const mins = String(date.getMinutes()).padStart(2, "0");
                        return `${year}-${month}-${day}T${hours}:${mins}`;
                      };

                      setInfo((previous) => ({
                        ...previous,
                        startsAt: previous.startsAt || formatDateTime(startTime),
                        endsAt: formatDateTime(endTime),
                      }));
                    }}
                    className={`flex-1 px-3 py-2 rounded-lg border-2 transition-all text-sm font-medium ${
                      isSelected
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-card border-border hover:border-primary cursor-pointer"
                    }`}
                  >
                    {duration}
                    <span className="text-xs ml-1">min</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Exam Start Time
            </label>
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
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Exam End Time
            </label>
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
          </div>

          {currentDuration && (
            <div className="bg-primary/10 text-primary rounded-lg p-3 text-sm">
              <p className="font-medium">
                Exam Duration: {currentDuration} minutes
              </p>
            </div>
          )}
        </RuleSection>

        <RuleSection
          title="Question Timer"
          description="Set time allocation per question. This helps students manage their time effectively."
        >
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Minutes Per Question
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((minutes) => {
                  const requiredDuration = calculateSuggestedDuration(minutes);
                  const isValid = !currentDuration || requiredDuration <= currentDuration;
                  const isSelected = info.minutesPerQuestion === minutes;
                  
                  return (
                    <button
                      key={minutes}
                      disabled={!isValid}
                      onClick={() => {
                        if (isValid) {
                          setInfo((previous) => ({
                            ...previous,
                            minutesPerQuestion: isSelected ? 0 : minutes,
                          }));
                        }
                      }}
                      className={`flex-1 px-3 py-2 rounded-lg border-2 transition-all text-sm font-medium ${
                        isSelected
                          ? "bg-primary border-primary text-primary-foreground"
                          : isValid
                          ? "bg-card border-border hover:border-primary cursor-pointer"
                          : "bg-muted/50 border-muted text-muted-foreground cursor-not-allowed opacity-50"
                      }`}
                      title={!isValid ? `Requires ${requiredDuration} minutes, but exam duration is only ${currentDuration} minutes` : isSelected ? "Click to deselect" : ""}
                    >
                      {minutes}
                      {minutes === 1 ? " min" : " mins"}
                    </button>
                  );
                })}
              </div>
              {!currentDuration && (
                <p className="text-xs text-muted-foreground">
                  Set exam start and end times to enable question timer selection
                </p>
              )}
            </div>

            {questionLimit > 0 && (
              <div className="bg-muted/40 border border-muted rounded-lg p-3 text-sm space-y-2">
                <p className="font-medium text-foreground">Time Allocation Guide</p>
                <div className="space-y-1 text-muted-foreground text-xs">
                  <p>• Total Questions: <span className="font-semibold text-foreground">{questionLimit}</span></p>
                  <p>• 1 min/question → <span className={calculateSuggestedDuration(1) <= (currentDuration || Infinity) ? "font-semibold text-foreground" : "font-semibold text-destructive"}>{calculateSuggestedDuration(1)} minutes</span> total</p>
                  <p>• 2 min/question → <span className={calculateSuggestedDuration(2) <= (currentDuration || Infinity) ? "font-semibold text-foreground" : "font-semibold text-destructive"}>{calculateSuggestedDuration(2)} minutes</span> total</p>
                  <p>• 3 min/question → <span className={calculateSuggestedDuration(3) <= (currentDuration || Infinity) ? "font-semibold text-foreground" : "font-semibold text-destructive"}>{calculateSuggestedDuration(3)} minutes</span> total</p>
                </div>
                {currentDuration && (
                  <div className="mt-2 pt-2 border-t border-muted">
                    <p className="text-xs font-medium">Available Duration: <span className="font-semibold text-foreground">{currentDuration} minutes</span></p>
                  </div>
                )}
              </div>
            )}
          </div>
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
