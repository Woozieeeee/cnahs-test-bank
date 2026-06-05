export interface SectionStudent {
  id: number;

  studentId: string;

  name: string;

  status: "ACTIVE" | "AT_RISK";

  averageScore: number;

  completedAssessments: number;

  attendance: number;

  violations: number;
}
