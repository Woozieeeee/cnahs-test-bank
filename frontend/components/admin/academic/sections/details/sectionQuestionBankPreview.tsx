"use client";

import { memo } from "react";

import Link from "next/link";

import type { Section } from "@/types/academic/section";
import useSectionQuestionBankStats from "@/hooks/shared/useSectionQuestionBankStats";

interface Props {
  section: Section;
}

function SectionQuestionBankPreview({ section }: Props) {
  // MOCKS FOR NOW

  const { stats } = useSectionQuestionBankStats(section.id);

  const totalQuestions = stats?.totalQuestions ?? 0;

  const totalTopics = stats?.totalTopics ?? 0;

  const weakQuestions = stats?.weakQuestions ?? 0;

  const averageSuccessRate = stats?.averageSuccessRate ?? 0;

  return (
    <Link
      href={`/admin/academic/sections/${section.id}/question-bank`}
      className="block h-full"
    >
      <div className="border-border bg-card hover:border-ring flex h-full flex-col rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
        {/* HEADER */}

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-foreground text-lg font-semibold">
              Question Bank
            </h2>

            <p className="text-muted-foreground mt-1 text-sm">
              Question performance and topic mastery.
            </p>
          </div>

          <div className="bg-muted text-foreground rounded-xl px-3 py-2 text-sm font-medium">
            {totalQuestions}
          </div>
        </div>

        {/* METRICS */}

        <div className="mt-6 flex-1">
          <div className="mt-6 grid grid-cols-2 gap-3">
            <MetricCard
              label="Topics"
              value={totalTopics}
            />

            <MetricCard
              label="Weak Questions"
              value={weakQuestions}
            />

            <MetricCard
              label="Success Rate"
              value={`${averageSuccessRate}%`}
            />

            <MetricCard
              label="Questions"
              value={totalQuestions}
            />
          </div>

          {/* FOOTER */}

          <div className="text-primary mt-auto pt-4 text-sm font-medium">
            View Question Bank →
          </div>
        </div>
      </div>
    </Link>
  );
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-muted/40 rounded-xl p-5 text-center">
      <p className="text-muted-foreground text-xs">
        {label}
      </p>

      <p className="text-foreground mt-2 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}

export default memo(SectionQuestionBankPreview);
