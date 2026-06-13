import prisma from "../../lib/prisma";
import {
  EXAM_VIOLATIONS,
  type ExamViolation as ActivityViolationType,
} from "../../lib/constants/activity/violations";
import { recordExamViolation as logExamViolationActivity } from "../activity/record_exam_violation_service";
import { facultyNotificationHandler } from "../notification/faculty_notification_handler";
import { studentNotificationHandler } from "../notification/student_notification_handler";
import { adminNotificationHandler } from "../notification/admin_notification_handler";

const DEDUPE_WINDOW_MS = 30_000;

const VALID_VIOLATION_TYPES = new Set<string>(EXAM_VIOLATIONS);

const FRONTEND_SEVERITY_TO_DB: Record<string, "LOW" | "MEDIUM" | "HIGH"> = {
  WARNING: "MEDIUM",
  CRITICAL: "HIGH",
};

export interface RecordLiveExamViolationInput {
  examId: number;
  studentId: number;
  studentName: string;
  type: string;
  description?: string;
  severity?: string;
  metadata?: Record<string, unknown>;
}

export interface RecordLiveExamViolationResult {
  violationId: number;
  deduplicated: boolean;
  flagged: boolean;
  autoSubmitted: boolean;
  violationCount: number;
  thresholdCrossed: boolean;
  thresholdAction?: string;
}

function normalizeViolationType(type: string): ActivityViolationType {
  const normalized = type.toUpperCase();

  if (VALID_VIOLATION_TYPES.has(normalized)) {
    return normalized as ActivityViolationType;
  }

  return "SUSPICIOUS_ACTIVITY";
}

function mapSeverity(severity?: string): "LOW" | "MEDIUM" | "HIGH" {
  if (!severity) return "MEDIUM";
  return FRONTEND_SEVERITY_TO_DB[severity.toUpperCase()] ?? "MEDIUM";
}

async function ensureActiveAttempt(examId: number, studentId: number) {
  const completedAttempt = await prisma.examAttempt.findFirst({
    where: {
      examId,
      studentId,
      status: { in: ["SUBMITTED", "AUTO_SUBMITTED", "COMPLETED"] },
    },
  });

  if (completedAttempt) {
    throw new Error("Exam already submitted");
  }

  const existingAttempt = await prisma.examAttempt.findFirst({
    where: { examId, studentId },
    orderBy: { startedAt: "desc" },
  });

  if (existingAttempt) {
    return existingAttempt;
  }

  return prisma.examAttempt.create({
    data: {
      examId,
      studentId,
      startedAt: new Date(),
      status: "IN_PROGRESS",
    },
  });
}

export async function recordLiveExamViolation(
  input: RecordLiveExamViolationInput,
): Promise<RecordLiveExamViolationResult> {
  const exam = await prisma.exam.findUnique({
    where: { id: input.examId },
    select: {
      id: true,
      violationThreshold: true,
      thresholdAction: true,
    },
  });

  if (!exam) {
    throw new Error("Exam not found");
  }

  await ensureActiveAttempt(input.examId, input.studentId);

  const violationType = normalizeViolationType(input.type);
  const dbSeverity = mapSeverity(input.severity);
  const dedupeSince = new Date(Date.now() - DEDUPE_WINDOW_MS);

  const recentDuplicate = await prisma.examViolation.findFirst({
    where: {
      examId: input.examId,
      studentId: input.studentId,
      type: violationType,
      timestamp: { gte: dedupeSince },
    },
    orderBy: { timestamp: "desc" },
  });

  if (recentDuplicate) {
    const violationCount = await prisma.examViolation.count({
      where: { examId: input.examId, studentId: input.studentId },
    });

    return {
      violationId: recentDuplicate.id,
      deduplicated: true,
      flagged: false,
      autoSubmitted: false,
      violationCount,
      thresholdCrossed: false,
    };
  }

  const violation = await prisma.examViolation.create({
    data: {
      examId: input.examId,
      studentId: input.studentId,
      type: violationType,
      severity: dbSeverity,
      description: input.description ?? null,
      details: input.metadata ? JSON.stringify(input.metadata) : null,
      resolved: false,
      timestamp: new Date(),
    },
  });

  void logExamViolationActivity({
    violation: violationType,
    studentName: input.studentName,
    metadata: {
      examId: input.examId,
      violationId: violation.id,
      ...input.metadata,
    },
  }).catch((error) => {
    console.error("Failed to log exam violation activity:", error);
  });

  void facultyNotificationHandler
    .notifyViolationDetected(violation.id)
    .catch((error) => {
      console.error("Failed to send faculty violation notification:", error);
    });

  const violationCount = await prisma.examViolation.count({
    where: { examId: input.examId, studentId: input.studentId },
  });

  let flagged = false;
  let autoSubmitted = false;
  const thresholdCrossed = violationCount === exam.violationThreshold;

  if (thresholdCrossed) {
    const attempt = await prisma.examAttempt.findFirst({
      where: {
        examId: input.examId,
        studentId: input.studentId,
        status: { in: ["IN_PROGRESS", "FLAGGED"] },
      },
      orderBy: { startedAt: "desc" },
    });

    if (attempt?.status === "IN_PROGRESS") {
      if (exam.thresholdAction === "FLAG_REVIEW") {
        await prisma.examAttempt.update({
          where: { id: attempt.id },
          data: { status: "FLAGGED" },
        });
        flagged = true;

        void studentNotificationHandler
          .notifyExamFlagged(violation.id)
          .catch((error) => {
            console.error("Failed to send student flag notification:", error);
          });
      } else if (exam.thresholdAction === "AUTO_SUBMIT") {
        await prisma.examAttempt.update({
          where: { id: attempt.id },
          data: {
            status: "AUTO_SUBMITTED",
            submittedAt: new Date(),
          },
        });
        autoSubmitted = true;

        void facultyNotificationHandler
          .notifyStudentSubmissionReceived(attempt.id)
          .catch((error) => {
            console.error(
              "Failed to send faculty auto-submit notification:",
              error,
            );
          });
      } else if (exam.thresholdAction === "END_EXAM") {
        await prisma.examAttempt.update({
          where: { id: attempt.id },
          data: { status: "FLAGGED" },
        });
        flagged = true;
      }
    }

    void adminNotificationHandler
      .notifyExamViolationEscalation(
        input.examId,
        input.studentId,
        violationCount,
        autoSubmitted
          ? `Violation threshold (${exam.violationThreshold}) reached — exam auto-submitted`
          : flagged
            ? `Violation threshold (${exam.violationThreshold}) reached — attempt flagged`
            : `Violation threshold (${exam.violationThreshold}) reached`,
      )
      .catch((error) => {
        console.error("Failed to send admin violation escalation:", error);
      });
  } else if (dbSeverity === "HIGH") {
    void adminNotificationHandler
      .notifyExamViolationEscalation(
        input.examId,
        input.studentId,
        violationCount,
        `High-severity violation: ${violationType}`,
      )
      .catch((error) => {
        console.error("Failed to send admin high-severity escalation:", error);
      });
  }

  return {
    violationId: violation.id,
    deduplicated: false,
    flagged,
    autoSubmitted,
    violationCount,
    thresholdCrossed,
    thresholdAction: thresholdCrossed ? exam.thresholdAction : undefined,
  };
}
