import prisma from "../../../lib/prisma";

export interface ActivityFeedFilters {
  studentId?: number;
  type?: string[];
  severity?: string[];
  limit?: number;
  offset?: number;
}

export async function getExamActivityFeedService(
  examId: number,
  facultyId: number,
  filters: ActivityFeedFilters = {}
) {
  // Verify exam belongs to faculty
  const exam = await prisma.exam.findFirst({
    where: {
      id: examId,
      OR: [
        { createdById: facultyId },
        { facultyId },
        {
          section: {
            sectionSubjects: {
              some: {
                facultyId,
              },
            },
          },
        },
      ],
    },
  });

  if (!exam) {
    throw new Error("Exam not found or unauthorized");
  }

  const whereClause: any = {
    examId,
    timestamp: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
  };

  if (filters.studentId) {
    whereClause.studentId = filters.studentId;
  }

  if (filters.type?.length) {
    whereClause.type = { in: filters.type };
  }

  if (filters.severity?.length) {
    whereClause.severity = { in: filters.severity };
  }

  const [violations, total] = await Promise.all([
    prisma.examViolation.findMany({
      where: whereClause,
      include: {
        student: {
          select: {
            id: true,
            name: true,
            studentId: true,
          },
        },
      },
      orderBy: { timestamp: "desc" },
      take: filters.limit || 50,
      skip: filters.offset || 0,
    }),
    prisma.examViolation.count({ where: whereClause }),
  ]);

  const activities = violations.map((v) => ({
    id: v.id,
    timestamp: v.timestamp.toISOString(),
    studentName: v.student.name,
    studentNumber: v.student.studentId,
    studentId: v.student.id,
    action: getViolationActionText(v.type),
    type: v.type,
    severity: mapSeverityToLevel(v.severity),
    isViolation: true,
    resolved: v.resolved,
    description: v.description,
    details: v.details,
  }));

  return {
    activities,
    pagination: {
      total,
      limit: filters.limit || 50,
      offset: filters.offset || 0,
      hasMore: (filters.offset || 0) + (filters.limit || 50) < total,
    },
  };
}

function getViolationActionText(violationType: string): string {
  const violationMap: Record<string, string> = {
    TAB_SWITCH: "switched tabs",
    WINDOW_BLUR: "window blur detected",
    DEVICE_CHANGE: "device change detected",
    MULTIPLE_FACES: "multiple faces detected",
    NO_FACE: "no face detected",
    SUSPICIOUS_ACTIVITY: "suspicious activity detected",
  };
  return violationMap[violationType] || "violation detected";
}

function mapSeverityToLevel(severity: string): "INFO" | "WARNING" | "ERROR" {
  const severityMap: Record<string, "INFO" | "WARNING" | "ERROR"> = {
    LOW: "INFO",
    MEDIUM: "WARNING",
    HIGH: "ERROR",
  };
  return severityMap[severity] || "INFO";
}
