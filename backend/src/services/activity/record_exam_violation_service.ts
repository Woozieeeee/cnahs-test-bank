import { createActivityLog } from "./create_activity_log_service";
import { VIOLATION_MESSAGES } from "../../lib/constants/activity/violationMessages";
import { VIOLATION_SEVERITY } from "../../lib/constants/activity/violationSeverity";
import type { ExamViolation } from "../../lib/constants/activity/violations";

interface RecordExamViolationParams {
  violation: ExamViolation;

  studentName: string;

  metadata?: Record<string, unknown>;
}

export const recordExamViolation = async ({
  violation,
  studentName,
  metadata,
}: RecordExamViolationParams) => {
  const message = VIOLATION_MESSAGES[violation];

  const severity = VIOLATION_SEVERITY[violation];

  return createActivityLog({
    action: message.action,

    description: message.description,

    categories: ["VIOLATIONS", "EXAM", "SECURITY"],

    severity,

    performedBy: studentName,

    targetUser: studentName,

    metadata: {
      violation,

      ...metadata,
    },
  });
};
