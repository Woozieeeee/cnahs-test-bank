import type { Exam } from "@/types/exams/examMonitoring";
import api from "@/lib/axios";

export interface ExamMonitoringResponse {
  exam: Exam;
  statistics: {
    totalStudents: number;
    activeStudents: number;
    completedStudents: number;
    flaggedStudents: number;
    progressPercentage: number;
    riskLevel: "LOW" | "MEDIUM" | "HIGH";
    timeRemainingMinutes: number;
    violationCount: number;
  };
  studentMonitoring: Array<{
    id: number;
    name: string;
    studentNumber: string;
    status: "ACTIVE" | "COMPLETED" | "FLAGGED";
    startTime: string;
    submissionTime: string | null;
    riskLevel: "LOW" | "MEDIUM" | "HIGH";
    score: number | null;
    violationCount: number;
  }>;
  activityFeed: Array<{
    id: number;
    timestamp: string;
    studentName: string;
    action: string;
    severity: "INFO" | "WARNING" | "ERROR";
    isViolation: boolean;
    type: string;
  }>;
  lastUpdated: string;
}

export async function getFacultyExams(filters?: {
  status?: string[];
  subjectId?: number;
  search?: string;
}): Promise<Exam[]> {
  const params = new URLSearchParams();

  if (filters?.status?.length) {
    params.append("status", filters.status.join(","));
  }
  if (filters?.subjectId) {
    params.append("subjectId", filters.subjectId.toString());
  }
  if (filters?.search) {
    params.append("search", filters.search);
  }

  const response = await api.get("/faculty/exams", { params });
  return response.data;
}

export async function getExamMonitoringDetails(examId: number): Promise<ExamMonitoringResponse> {
  const response = await api.get(`/faculty/exams/${examId}/monitoring`);
  return response.data;
}

export async function getExamActivityFeed(
  examId: number,
  limit: number = 50,
  offset: number = 0,
  filters?: {
    studentId?: number;
    severity?: string[];
    type?: string[];
  }
) {
  const params: any = { limit, offset };

  if (filters?.studentId) {
    params.studentId = filters.studentId;
  }
  if (filters?.severity?.length) {
    params.severity = filters.severity.join(",");
  }
  if (filters?.type?.length) {
    params.type = filters.type.join(",");
  }

  const response = await api.get(`/faculty/exams/${examId}/activity-feed`, { params });
  return response.data;
}

export async function getExamViolations(
  examId: number,
  filters?: {
    limit?: number;
    unresolved?: boolean;
    severity?: string[];
    type?: string[];
  }
) {
  const params: any = {};

  if (filters?.limit) {
    params.limit = filters.limit;
  }
  if (filters?.unresolved) {
    params.unresolved = true;
  }
  if (filters?.severity?.length) {
    params.severity = filters.severity.join(",");
  }
  if (filters?.type?.length) {
    params.type = filters.type.join(",");
  }

  const response = await api.get(`/faculty/exams/${examId}/violations`, { params });
  return response.data;
}

export async function markViolationResolved(violationId: number): Promise<void> {
  await api.post(`/violations/${violationId}/resolve`);
}
