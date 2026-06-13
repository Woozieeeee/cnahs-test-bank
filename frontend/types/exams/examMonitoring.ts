export interface Exam {
  id: number;
  title: string;
  status: "DRAFT" | "SCHEDULED" | "ONGOING" | "COMPLETED" | "ARCHIVED" | "CANCELLED";
  subjectId: number;
  subjectName: string;
  subjectCode: string;
  sectionId: number;
  sectionName: string;
  totalQuestions: number;
  totalAttempts: number;
  duration: number;
  startsAt: string | null;
  endsAt: string | null;
  createdAt: string;
  
  // Monitoring data (populated when available)
  activeStudents?: number;
  totalStudents?: number;
  completedStudents?: number;
  pendingStudents?: number;
  flaggedStudents?: number;
  violations?: {
    count: number;
    recent: ExamViolation[];
  };
  progressPercentage?: number;
  lastActivityAt?: string;
  riskLevel?: "LOW" | "MEDIUM" | "HIGH";
  timeRemainingMinutes?: number;
  estimatedEndTime?: string;
  
  // Student attempts (populated from monitoring API)
  attempts?: Array<{
    studentId: number;
    status: "IN_PROGRESS" | "SUBMITTED" | "AUTO_SUBMITTED" | "COMPLETED" | "FLAGGED";
    startedAt?: string;
    submittedAt?: string;
    score?: number | null;
    student?: {
      name: string;
      studentId: string;
      id: number;
    };
  }>;

  studentMonitoring?: Array<{
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
}

export interface ExamViolation {
  id: number;
  examId: number;
  studentId: number;
  studentName: string;
  type: "TAB_SWITCH" | "WINDOW_BLUR" | "DEVICE_CHANGE" | "MULTIPLE_FACES" | "NO_FACE" | "SUSPICIOUS_ACTIVITY";
  severity: "LOW" | "MEDIUM" | "HIGH";
  timestamp: string;
  metadata: {
    description: string;
    details: string;
  };
  resolved: boolean;
  resolvedAt?: string;
  resolvedBy?: string;
}

export interface ExamFilter {
  status?: string[];
  subjectId?: number;
  sectionId?: number;
  searchQuery?: string;
}
