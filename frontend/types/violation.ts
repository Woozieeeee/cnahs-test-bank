// types/violation.ts
export type Severity = "LOW" | "MEDIUM" | "HIGH";

export interface Violation {
  id: number;
  type: string;
  severity: Severity; // Use the union type here
  time: string;
  timeAgo: string;
  createdAt: string;
  student: string;
  studentId: string;
  description: string;
}
