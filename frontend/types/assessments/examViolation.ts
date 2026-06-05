export interface ExamViolation {
  id: number;

  student: string;

  studentId: string;

  type: string;

  severity: "HIGH" | "MEDIUM" | "LOW";

  description: string;

  timeAgo: string;

  createdAt: string;
}
