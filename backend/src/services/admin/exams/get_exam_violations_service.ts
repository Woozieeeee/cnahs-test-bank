import prisma from "../../../lib/prisma";
import { Prisma } from "@prisma/client";

type ExamWithViolations = Prisma.ExamGetPayload<{
  include: {
    violations: {
      include: {
        student: {
          select: {
            id: true;
            name: true;
            studentId: true;
          };
        };
      };
    };
    section: {
      select: {
        id: true;
        name: true;
        sectionCode: true;
      };
    };
    subject: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;

interface ExamViolationsResponse {
  exam: {
    id: number;
    title: string;
    code: string;
    section: {
      id: number;
      name: string;
      code: string;
    } | null;
    subject: {
      id: number;
      name: string;
    };
    status: string;
    difficulty: string;
    startsAt: Date | null;
    endsAt: Date | null;
  };
  summary: {
    total: number;
    resolved: number;
    unresolved: number;
    bySeverity: {
      HIGH: number;
      MEDIUM: number;
      LOW: number;
    };
  };
  violations: Array<{
    id: number;
    student: {
      id: number;
      name: string;
      studentId: string | null;
    };
    type: string;
    severity: string;
    timestamp: Date;
    description: string | null;
    details: string | null;
    resolved: boolean;
    resolvedAt: Date | null;
    resolvedBy: string | null;
  }>;
}

export const getExamViolationsService = async (
  examId: number,
): Promise<ExamViolationsResponse> => {
  const exam = await prisma.exam.findUnique({
    where: { id: examId },
    include: {
      violations: {
        include: {
          student: {
            select: {
              id: true,
              name: true,
              studentId: true,
            },
          },
        },
        orderBy: {
          timestamp: "desc",
        },
      },
      section: {
        select: {
          id: true,
          name: true,
          sectionCode: true,
        },
      },
      subject: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!exam) {
    throw new Error("Exam not found");
  }

  const typedExam = exam as ExamWithViolations;

  // Group violations by severity
  const violationsBySeverity = {
    HIGH: typedExam.violations.filter((v) => v.severity === "HIGH"),
    MEDIUM: typedExam.violations.filter((v) => v.severity === "MEDIUM"),
    LOW: typedExam.violations.filter((v) => v.severity === "LOW"),
  };

  // Count resolved vs unresolved
  const resolved = typedExam.violations.filter((v) => v.resolved).length;
  const unresolved = typedExam.violations.filter((v) => !v.resolved).length;

  return {
    exam: {
      id: typedExam.id,
      title: typedExam.title,
      code: typedExam.examCode,
      section: typedExam.section
        ? {
            id: typedExam.section.id,
            name: typedExam.section.name,
            code: typedExam.section.sectionCode,
          }
        : null,
      subject: {
        id: typedExam.subject.id,
        name: typedExam.subject.name,
      },
      status: typedExam.status,
      difficulty: typedExam.difficulty,
      startsAt: typedExam.startsAt,
      endsAt: typedExam.endsAt,
    },
    summary: {
      total: typedExam.violations.length,
      resolved,
      unresolved,
      bySeverity: {
        HIGH: violationsBySeverity.HIGH.length,
        MEDIUM: violationsBySeverity.MEDIUM.length,
        LOW: violationsBySeverity.LOW.length,
      },
    },
    violations: typedExam.violations.map((v) => ({
      id: v.id,
      student: v.student,
      type: v.type,
      severity: v.severity,
      timestamp: v.timestamp,
      description: v.description,
      details: v.details,
      resolved: v.resolved,
      resolvedAt: v.resolvedAt,
      resolvedBy: v.resolvedBy,
    })),
  };
};
