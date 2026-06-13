import api from "@/lib/axios";
import type { ExamViolation } from "@/types/exams/examSession";

export interface RecordViolationResponse {
  message: string;
  violationId: number;
  deduplicated: boolean;
  flagged: boolean;
  autoSubmitted: boolean;
  violationCount: number;
  thresholdCrossed: boolean;
  thresholdAction?: string;
}

export const recordExamViolation = async (
  examId: string,
  violation: Pick<ExamViolation, "type" | "description" | "severity">,
): Promise<RecordViolationResponse> => {
  const response = await api.post<RecordViolationResponse>(
    `/student/exams/${examId}/violations`,
    {
      type: violation.type,
      description: violation.description,
      severity: violation.severity,
      metadata: {
        clientTimestamp: new Date().toISOString(),
      },
    },
  );

  return response.data;
};
