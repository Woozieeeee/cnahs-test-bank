import { mockStudentSession } from "@/components/admin/academic/sections/data/mockStudentSession";

import StudentSessionStatCard from "./studentSessionStatCard";

export default function StudentSessionStats() {
  return (
    <div
      className="
        grid
        gap-4
        sm:grid-cols-2
        xl:grid-cols-3
      "
    >
      <StudentSessionStatCard
        label="Student"
        value={mockStudentSession.name}
      />

      <StudentSessionStatCard
        label="Student ID"
        value={mockStudentSession.studentId}
      />

      <StudentSessionStatCard
        label="Status"
        value={mockStudentSession.status}
        badge="LIVE"
      />

      <StudentSessionStatCard
        label="Progress"
        value={`${mockStudentSession.progress}%`}
      />

      <StudentSessionStatCard
        label="Warnings"
        value={String(mockStudentSession.warnings)}
      />

      <StudentSessionStatCard
        label="Risk Level"
        value={mockStudentSession.risk}
      />
    </div>
  );
}
