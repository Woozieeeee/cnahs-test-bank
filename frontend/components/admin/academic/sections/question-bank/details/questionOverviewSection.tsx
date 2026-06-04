"use client";

import { memo } from "react";

import QuestionCorrectnessChart from "./questionCorrectnessChart";
import QuestionImpactChart from "./questionImpactChart";

interface Props {
  question: string;

  topic: string;

  difficulty: string;

  correct: number;

  incorrect: number;

  blockedStudents: {
    easy: number;
    medium: number;
    hard: number;
    expert: number;
  };
}

function QuestionOverviewSection({
  question,
  topic,
  difficulty,
  correct,
  incorrect,
  blockedStudents,
}: Props) {
  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      {/* HEADER */}

      <div>
        <h2 className="text-lg font-semibold">
          Question Intelligence
        </h2>

        <p className="text-muted-foreground mt-1 text-sm">
          Question details, answer accuracy, and progression
          impact.
        </p>
      </div>

      {/* CONTENT */}

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        {/* LEFT */}

        <div className="border-border bg-background rounded-xl border p-5">
          <div>
            <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
              Question Profile
            </p>

            <h3 className="text-foreground mt-4 text-xl leading-relaxed font-semibold">
              {question}
            </h3>
          </div>

          {/* TAGS */}

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              {topic}
            </span>

            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
              {difficulty}
            </span>
          </div>

          {/* INSIGHTS */}

          <div className="mt-6 grid grid-cols-2 gap-3">
            <MiniStat
              label="Difficulty"
              value={difficulty}
            />

            <MiniStat label="Topic" value={topic} />

            <MiniStat label="Impact" value="High" />

            <MiniStat
              label="Board Relevance"
              value="Critical"
            />
          </div>

          {/* DESCRIPTION */}

          <div className="border-border bg-muted/30 mt-6 rounded-xl border p-4">
            <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
              Learning Objective
            </p>

            <p className="text-muted-foreground mt-2 text-sm leading-6">
              Evaluate the student's understanding of
              pharmacological drug classifications and
              clinical application concepts.
            </p>
          </div>
        </div>

        {/* RIGHT */}

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="border-border bg-background rounded-xl border p-5">
            <h3 className="mb-4 font-semibold">
              Correct vs Incorrect
            </h3>

            <QuestionCorrectnessChart
              correct={correct}
              incorrect={incorrect}
            />
          </div>

          <div className="border-border bg-background rounded-xl border p-5">
            <h3 className="mb-4 font-semibold">
              Progression Impact
            </h3>

            <QuestionImpactChart
              blockedStudents={blockedStudents}
            />
          </div>
        </div>
      </div>
    </div>
  );

  function MiniStat({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) {
    return (
      <div className="bg-muted/40 rounded-xl p-3">
        <p className="text-muted-foreground text-xs">
          {label}
        </p>

        <p className="text-foreground mt-1 text-sm font-semibold">
          {value}
        </p>
      </div>
    );
  }
}

export default memo(QuestionOverviewSection);
