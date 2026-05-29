"use client";

import { useParams } from "next/navigation";

import PageContainer from "@/components/layout/pages/pageContainer";

import BackButton from "@/components/common/backButton";

export default function StudentExamSessionPage() {
  const params = useParams();

  const mockStudent = {
    id: params.studentId,

    name: "Maria Santos",

    studentId: "22-01845",

    section: "BSN-2A",

    status: "FLAGGED",

    progress: 58,

    risk: "MEDIUM",

    warnings: 2,

    currentDifficulty: "MEDIUM",

    nextUnlock: "HARD",

    requiredScore: 70,

    currentScore: 63,
  };

  const violations = [
    {
      id: 1,
      type: "Tab Switch",

      severity: "MEDIUM",

      time: "09:12 AM",
    },

    {
      id: 2,
      type: "Window Blur",

      severity: "LOW",

      time: "09:20 AM",
    },
  ];

  const timeline = [
    "09:00 AM - Exam Started",

    "09:12 AM - Warning Issued",

    "09:20 AM - Window Blur",

    "09:22 AM - Returned to Exam",
  ];

  return (
    <PageContainer>
      <BackButton
        href={`/admin/academic/sections/${params.id}/exams/${params.examId}/students`}
        label="Back to Sessions"
      />

      {/* HEADER */}

      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-foreground
          "
        >
          Student Exam Session
        </h1>

        <p
          className="
            mt-2
            text-muted-foreground
          "
        >
          Detailed monitoring and integrity report.
        </p>
      </div>

      {/* OVERVIEW */}

      <div
        className="
          mt-6
          grid
          gap-4
          md:grid-cols-4
        "
      >
        <StatCard
          label="Progress"
          value={`${mockStudent.progress}%`}
        />

        <StatCard
          label="Warnings"
          value={mockStudent.warnings}
        />

        <StatCard label="Risk" value={mockStudent.risk} />

        <StatCard
          label="Status"
          value={mockStudent.status}
        />
      </div>

      {/* STUDENT INFO */}

      <div
        className="
          mt-8
          rounded-2xl
          border
          border-border
          bg-card
          p-6
        "
      >
        <h2 className="font-semibold">
          Student Information
        </h2>

        <div className="mt-4 space-y-2">
          <p>{mockStudent.name}</p>

          <p>{mockStudent.studentId}</p>

          <p>{mockStudent.section}</p>
        </div>
      </div>

      {/* PROGRESSION */}

      <div
        className="
          mt-6
          rounded-2xl
          border
          border-border
          bg-card
          p-6
        "
      >
        <h2 className="font-semibold">
          Progression Status
        </h2>

        <div className="mt-4 space-y-2">
          <p>
            Current Difficulty:{" "}
            {mockStudent.currentDifficulty}
          </p>

          <p>Next Unlock: {mockStudent.nextUnlock}</p>

          <p>Current Score: {mockStudent.currentScore}%</p>

          <p>Required: {mockStudent.requiredScore}%</p>
        </div>
      </div>

      {/* VIOLATIONS */}

      <div
        className="
          mt-6
          rounded-2xl
          border
          border-border
          bg-card
          p-6
        "
      >
        <h2 className="font-semibold">Violations</h2>

        <div className="mt-4 space-y-3">
          {violations.map((violation) => (
            <div
              key={violation.id}
              className="
                rounded-xl
                border
                border-border
                p-4
              "
            >
              <p>{violation.type}</p>

              <p className="text-sm text-muted-foreground">
                {violation.time}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* TIMELINE */}

      <div
        className="
          mt-6
          rounded-2xl
          border
          border-border
          bg-card
          p-6
        "
      >
        <h2 className="font-semibold">Session Timeline</h2>

        <div className="mt-4 space-y-3">
          {timeline.map((event, index) => (
            <div
              key={index}
              className="
                rounded-xl
                border
                border-border
                p-4
              "
            >
              {event}
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-border
        bg-card
        p-5
      "
    >
      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <h2
        className="
          mt-2
          text-2xl
          font-bold
          text-foreground
        "
      >
        {value}
      </h2>
    </div>
  );
}
