import prisma from "../../../lib/prisma";

interface ViolationFilters {
  limit?: number;
  unresolved?: boolean;
  severity?: string[];
  type?: string[];
  startDate?: Date;
  endDate?: Date;
}

export async function getExamViolationsService(examId: number, facultyId: number, filters: ViolationFilters = {}) {
  const exam = await prisma.exam.findFirst({ where: { id: examId, OR: [{ createdById: facultyId }, { facultyId }] } });
  if (!exam) throw new Error("Exam not found or unauthorized");

  const whereClause: any = { examId, timestamp: { gte: filters.startDate || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } };
  if (filters.endDate) whereClause.timestamp.lte = filters.endDate;
  if (filters.unresolved) whereClause.resolved = false;
  if (filters.severity?.length) whereClause.severity = { in: filters.severity };
  if (filters.type?.length) whereClause.type = { in: filters.type };

  const violations = await prisma.examViolation.findMany({
    where: whereClause,
    include: { student: { select: { name: true } } },
    orderBy: { timestamp: "desc" },
    take: filters.limit || 50,
  });

  return violations.map((v) => ({
    id: v.id,
    examId: v.examId,
    studentId: v.studentId,
    studentName: v.student.name,
    type: v.type as any,
    severity: v.severity as any,
    timestamp: v.timestamp.toISOString(),
    metadata: { description: v.description || "", details: v.details || "" },
    resolved: v.resolved,
    resolvedAt: v.resolvedAt?.toISOString(),
    resolvedBy: v.resolvedBy || undefined,
  }));
}

export async function getRecentViolationsService(facultyId: number, limit: number = 5) {
  const examIds = (await prisma.exam.findMany({
    where: { OR: [{ createdById: facultyId }, { facultyId }] },
    select: { id: true },
  })).map((e) => e.id);

  if (examIds.length === 0) return [];

  const violations = await prisma.examViolation.findMany({
    where: { examId: { in: examIds }, timestamp: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, resolved: false },
    include: { student: { select: { name: true } }, exam: { select: { title: true, subject: { select: { name: true } } } } },
    orderBy: { timestamp: "desc" },
    take: limit,
  });

  return violations.map((v) => ({
    id: v.id,
    examId: v.examId,
    studentId: v.studentId,
    studentName: v.student.name,
    examTitle: v.exam.title,
    subjectName: v.exam.subject.name,
    type: v.type as any,
    severity: v.severity as any,
    timestamp: v.timestamp.toISOString(),
    metadata: { description: v.description || "", details: v.details || "" },
    resolved: v.resolved,
  }));
}

export async function markViolationResolvedService(violationId: number, facultyId: number, resolvedBy: string) {
  const violation = await prisma.examViolation.findFirst({
    where: { id: violationId },
    include: { exam: { select: { facultyId: true, createdById: true } } },
  });

  if (!violation || (violation.exam.facultyId !== facultyId && violation.exam.createdById !== facultyId)) {
    throw new Error("Violation not found or unauthorized");
  }

  return prisma.examViolation.update({
    where: { id: violationId },
    data: { resolved: true, resolvedAt: new Date(), resolvedBy },
  });
}
