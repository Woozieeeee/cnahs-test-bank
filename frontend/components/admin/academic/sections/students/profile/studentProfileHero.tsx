"use client";

import { memo } from "react";

interface Props {
  profile: {
    profile: {
      id: number;
      name: string;
      email: string;
      studentId: string;
      accountAge: number;
      createdAt: string;
      updatedAt: string;
    };
    enrollments: {
      count: number;
      sections: Array<{ id: number; name: string; code: string; academicYear: string; semester: string }>;
    };
    performance: {
      totalAttempts: number;
      passedAttempts: number;
      passRate: number;
      averageScore: number;
    };
    recentExams: any[];
    recentViolations: any[];
  };
}

function StudentProfileHero({ profile }: Props) {
  const studentData = profile.profile;
  const perf = profile.performance;

  const initials = studentData.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Determine status based on performance
  let status = "PASSING";
  if (perf.totalAttempts === 0) {
    status = "INACTIVE";
  } else if (perf.passRate < 70) {
    status = "STRUGGLING";
  }

  return (
    <div className="border-border bg-card overflow-hidden rounded-2xl border">
      <div className="from-primary/15 via-primary/5 to-background h-40 bg-gradient-to-r" />

      <div className="relative px-8 pb-8">
        <div className="border-card bg-primary text-primary-foreground absolute -top-12 flex h-24 w-24 items-center justify-center rounded-full border-4 text-2xl font-bold">
          {initials}
        </div>

        <div className="pt-16">
          <h1 className="text-2xl font-bold">
            {studentData.name}
          </h1>

          <p className="text-muted-foreground">
            {studentData.studentId}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
              status === "PASSING"
                ? "bg-green-100 text-green-700"
                : status === "INACTIVE"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
            }`}>
              {status}
            </span>
          </div>

          <div className="border-border mt-6 grid gap-4 border-t pt-6 md:grid-cols-4">
            <div>
              <p className="text-muted-foreground text-xs">
                Student ID
              </p>

              <p className="font-medium">
                {studentData.studentId}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-xs">
                Enrollments
              </p>

              <p className="font-medium">
                {profile.enrollments.count} Section(s)
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-xs">
                Average Score
              </p>

              <p className="font-medium">
                {perf.averageScore.toFixed(1)}%
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-xs">
                Account Age
              </p>

              <p className="font-medium">
                {studentData.accountAge} days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(StudentProfileHero);
