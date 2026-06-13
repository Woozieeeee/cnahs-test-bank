import api from "@/lib/axios";

// =========================
// GET PENDING STUDENTS
// =========================

export const getPendingStudents = async () => {
  const response = await api.get("/admin/pending-students");

  return response.data;
};

// =========================
// APPROVE STUDENT
// =========================

export const approveStudent = async (id: number) => {
  const response = await api.patch(`/admin/approve/${id}`);

  return response.data;
};

// =========================
// REJECT STUDENT
// =========================

export const rejectStudent = async (id: number) => {
  const response = await api.patch(`/admin/reject/${id}`);

  return response.data;
};

// =========================
// DASHBOARD STATS
// =========================

export const getDashboardStats = async () => {
  const response = await api.get("/admin/dashboard/stats");

  return response.data;
};

// =========================
// RECENT REGISTRATIONS
// =========================

export const getRecentRegistrations = async () => {
  const response = await api.get(
    "/admin/dashboard/recent-registrations"
  );

  return response.data;
};

// =========================
// RECENT ACTIVITY
// =========================

export const getRecentActivity = async () => {
  const response = await api.get("/admin/recent-activity");

  return response.data;
};

// =========================
// USERS MANAGEMENT
// =========================

export const getUsers = async ({
  page = 1,

  limit = 10,

  search = "",

  role = "ALL",

  status = "ALL",
}) => {
  const response = await api.get(
    `/admin/users?page=${page}&limit=${limit}&search=${search}&role=${role}&status=${status}`
  );

  return response.data;
};

export const updateAdminUser = async (
  id: number,
  data: {
    name?: string;
    username?: string;
    status?: string;
    password?: string;
  }
) => {
  const response = await api.patch(
    `/admin/users/${id}`,
    data
  );
  return response.data;
};

// =========================
// GET FACULTY USERS
// =========================

export const getFacultyUsers = async () => {
  const response = await api.get("/admin/users", {
    params: {
      page: 1,

      limit: 1000,

      role: "FACULTY",

      status: "ALL",
    },
  });

  return response.data.users;
};

// =========================
// CREATE FACULTY
// =========================

export const createFaculty = async (data: {
  name: string;
  username: string;
  password: string;
}) => {
  const response = await api.post("/admin/faculty", data);

  return response.data;
};

// =========================
// ACTIVITY LOGS
// =========================
export const getActivityLogs = async (params: {
  page: number;

  limit: number;

  search: string;

  category: string;

  severity: string;
}) => {
  const response = await api.get("/admin/activity-logs", {
    params,
  });

  return response.data;
};

// =========================
// EXAM SECTIONS
// =========================
export const getExamSections = async () => {
  const response = await api.get("/admin/exams/sections");

  return response.data;
};

// =========================
// ADMIN EXAMS (ALL EXAMS)
// =========================
export const getAdminExams = async (filters?: {
  status?: string[];
  subjectId?: number;
  search?: string;
}) => {
  const params = new URLSearchParams();

  if (filters?.status?.length) {
    params.append("status", filters.status.join(","));
  }
  if (filters?.subjectId) {
    params.append(
      "subjectId",
      filters.subjectId.toString()
    );
  }
  if (filters?.search) {
    params.append("search", filters.search);
  }

  const response = await api.get("/admin/exams", {
    params,
  });
  return response.data;
};

// =========================
// EXAM SECTION DETAILS
// =========================
export const getExamSectionDetails = async (
  sectionId: number
) => {
  const response = await api.get(
    `/admin/exams/sections/${sectionId}`
  );

  return response.data;
};

// =========================
// SYSTEM SETTINGS
// =========================
export const getSystemSettings = async () => {
  const response = await api.get("/admin/settings");

  return response.data;
};

export const updateSystemSettings = async (settings: {
  sessionTimeoutHours?: number;
  maxLoginAttempts?: number;
  dataRetentionDays?: number;
  maxConcurrentUsers?: number;
  passwordExpiryDays?: number;
  forcePasswordExpiry?: boolean;
  enableTwoFactor?: boolean;
  trackLoginHistory?: boolean;
  enableIpWhitelist?: boolean;
  inAppNotifications?: boolean;
  dashboardAlerts?: boolean;
  criticalSystemAlerts?: boolean;
}) => {
  const response = await api.patch(
    "/admin/settings",
    settings
  );

  return response.data;
};

// =========================
// SECURITY POLICIES
// =========================
export const updateSecurityPolicies = async (policies: {
  forcePasswordExpiry?: boolean;
  passwordExpiryDays?: number;
  enableTwoFactor?: boolean;
  trackLoginHistory?: boolean;
  enableIpWhitelist?: boolean;
  ipWhitelist?: string[];
  maxLoginAttempts?: number;
}) => {
  const response = await api.patch(
    "/admin/settings/security",
    policies
  );

  return response.data;
};

// =========================
// NOTIFICATION SETTINGS
// =========================
export const updateNotificationSettings =
  async (notifications: {
    inAppNotifications?: boolean;
    dashboardAlerts?: boolean;
    criticalSystemAlerts?: boolean;
  }) => {
    const response = await api.patch(
      "/admin/settings/notifications",
      notifications
    );

    return response.data;
  };

// =========================
// CHANGE PASSWORD
// =========================
export const changeAdminPassword = async (passwords: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await api.patch(
    "/admin/password",
    passwords
  );

  return response.data;
};

// =========================
// LOGIN HISTORY
// =========================
export const getLoginHistory = async (
  userId: number,
  limit = 50
) => {
  const response = await api.get("/admin/login-history", {
    params: { userId, limit },
  });

  return response.data;
};

export const getRecentLogins = async (limit = 20) => {
  const response = await api.get(
    "/admin/login-history/recent",
    {
      params: { limit },
    }
  );

  return response.data;
};

// =========================
// SECTION STUDENTS (ACADEMIC)
// =========================
export const getSectionStudents = async (
  sectionId: number
) => {
  const response = await api.get(
    `/admin/academic/sections/${sectionId}/students`
  );

  return response.data;
};

// =========================
// SECTION EXAMS (ACADEMIC)
// =========================
export const getSectionExams = async (
  sectionId: number
) => {
  const response = await api.get(
    `/admin/academic/sections/${sectionId}/exams`
  );

  return response.data;
};

// =========================
// SECTION SUBJECTS (ACADEMIC)
// =========================
export const getSectionSubjects = async (
  sectionId: number
) => {
  const response = await api.get(
    `/admin/academic/sections/${sectionId}/subjects`
  );

  return response.data;
};

// =========================
// QUESTION BANK (ACADEMIC)
// =========================
export const getQuestionBank = async (
  sectionId: number,
  params?: {
    topic?: string;
    search?: string;
    page?: number;
    limit?: number;
  }
) => {
  const response = await api.get(
    `/admin/academic/sections/${sectionId}/questions`,
    { params }
  );

  return response.data;
};

// =========================
// QUESTION DETAILS (ACADEMIC)
// =========================
export const getQuestionDetails = async (
  questionId: number
) => {
  const response = await api.get(
    `/admin/academic/questions/${questionId}`
  );

  return response.data;
};

// =========================
// SUBJECT ANALYTICS (ACADEMIC)
// =========================
export const getSubjectAnalytics = async (
  subjectId: number
) => {
  const response = await api.get(
    `/admin/academic/subjects/${subjectId}/analytics`
  );

  return response.data;
};

// =========================
// ASSESSMENT ANALYTICS (ACADEMIC)
// =========================
export const getAssessmentAnalytics = async (
  sectionId: number,
  subjectId: number
) => {
  const response = await api.get(
    `/admin/academic/sections/${sectionId}/subjects/${subjectId}/assessments/analytics`
  );

  return response.data;
};

// =========================
// EXAM DETAILS (ACADEMIC)
// =========================
export const getExamDetails = async (examId: number) => {
  const response = await api.get(`/admin/exams/${examId}`);

  return response.data;
};

// =========================
// EXAM VIOLATIONS (ACADEMIC)
// =========================
export const getExamViolations = async (
  examId: number,
  params?: {
    severity?: string;
    resolved?: string;
    page?: number;
    limit?: number;
  }
) => {
  const response = await api.get(
    `/admin/exams/${examId}/violations`,
    { params }
  );

  return response.data;
};

// =========================
// STUDENT PROFILE (PHASE 4)
// =========================
export const getStudentProfile = async (
  studentId: number
) => {
  const response = await api.get(
    `/admin/students/${studentId}/profile`
  );

  return response.data;
};

// =========================
// SECTION SUBJECT DETAILS (PHASE 4)
// =========================
export const getSectionSubjectDetails = async (
  sectionId: number,
  subjectId: number
) => {
  const response = await api.get(
    `/admin/academic/sections/${sectionId}/subjects/${subjectId}/details`
  );

  return response.data;
};
