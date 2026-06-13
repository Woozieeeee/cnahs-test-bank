import api from "@/lib/axios";

export interface PauseExamResponse {
  success: boolean;
  message: string;
}

export interface EndExamResponse {
  success: boolean;
  message: string;
  affectedStudents: number;
}

export interface FlagStudentResponse {
  success: boolean;
  message: string;
}

export interface NotifyStudentResponse {
  success: boolean;
  message: string;
}

export interface UnlockStudentResponse {
  success: boolean;
  message: string;
}

export interface ExportExamReportResponse {
  success: boolean;
  reportData: Record<string, any>;
}

/**
 * Pause an ongoing exam
 */
export async function pauseExam(examId: number): Promise<PauseExamResponse> {
  const response = await api.post(`/faculty/exams/${examId}/pause`);
  return response.data;
}

/**
 * End an exam (optionally force-end all students)
 */
export async function endExam(
  examId: number,
  force: boolean = false
): Promise<EndExamResponse> {
  const response = await api.post(`/faculty/exams/${examId}/end`, { force });
  return response.data;
}

/**
 * Flag a student during an exam
 */
export async function flagStudent(
  examId: number,
  studentId: number,
  reason?: string
): Promise<FlagStudentResponse> {
  const response = await api.post(`/faculty/exams/${examId}/flag-student`, {
    studentId,
    reason,
  });
  return response.data;
}

/**
 * Send a notification to a student during an exam
 */
export async function notifyStudent(
  examId: number,
  studentId: number,
  message: string
): Promise<NotifyStudentResponse> {
  const response = await api.post(
    `/faculty/exams/${examId}/notify-student`,
    {
      studentId,
      message,
    }
  );
  return response.data;
}

/**
 * Unlock a flagged student to allow them to continue the exam
 */
export async function unlockStudent(
  examId: number,
  studentId: number
): Promise<UnlockStudentResponse> {
  const response = await api.post(`/faculty/exams/${examId}/unlock-student`, {
    studentId,
  });
  return response.data;
}

/**
 * Export exam report as PDF
 */
export async function exportExamReport(examId: number): Promise<Blob> {
  const response = await api.get(`/faculty/exams/${examId}/report`, {
    responseType: "blob",
  });
  return response.data;
}

/**
 * Resolve a violation (mark as reviewed)
 */
export async function resolveViolation(
  violationId: number
): Promise<{ success: boolean; message: string }> {
  const response = await api.post(`/faculty/violations/${violationId}/resolve`);
  return response.data;
}

/**
 * Reset all violations for an exam
 */
export async function resetViolations(
  examId: number
): Promise<{ success: boolean; message: string; count: number }> {
  const response = await api.post(`/faculty/exams/${examId}/reset-violations`);
  return response.data;
}

/**
 * Send an announcement to all students in an exam
 */
export async function sendAnnouncement(
  examId: number,
  message: string
): Promise<{ success: boolean; message: string }> {
  const response = await api.post(`/faculty/exams/${examId}/announcement`, {
    message,
  });
  return response.data;
}
