import api from "@/lib/axios";

// =========================
// TOPICS
// =========================
export const createFacultyTopic = async (
  subjectId: number,
  data: { name: string; description?: string }
) => {
  const response = await api.post(`/faculty/subjects/${subjectId}/topics`, data);
  return response.data;
};

export const updateFacultyTopic = async (
  topicId: number,
  data: { name?: string; description?: string }
) => {
  const response = await api.put(`/faculty/topics/${topicId}`, data);
  return response.data;
};

export const archiveFacultyTopic = async (topicId: number) => {
  const response = await api.put(`/faculty/topics/${topicId}/archive`);
  return response.data;
};

export const restoreFacultyTopic = async (topicId: number) => {
  const response = await api.put(`/faculty/topics/${topicId}/restore`);
  return response.data;
};

// =========================
// QUESTIONS
// =========================
export const createFacultyQuestion = async (
  topicId: number,
  data: {
    question: string;
    correctAnswer: string;
    options: string[];
    explanation?: string;
    difficulty: string;
  }
) => {
  const response = await api.post(`/faculty/topics/${topicId}/questions`, data);
  return response.data;
};

export const updateFacultyQuestion = async (
  questionId: number,
  data: {
    question?: string;
    correctAnswer?: string;
    options?: string[];
    explanation?: string;
    difficulty?: string;
  }
) => {
  const response = await api.put(`/faculty/questions/${questionId}`, data);
  return response.data;
};

export const archiveFacultyQuestion = async (questionId: number) => {
  const response = await api.put(`/faculty/questions/${questionId}/archive`);
  return response.data;
};

export const restoreFacultyQuestion = async (questionId: number) => {
  const response = await api.put(`/faculty/questions/${questionId}/restore`);
  return response.data;
};

export const downloadQuestionTemplate = async () => {
  const response = await api.get("/faculty/questions/template", {
    responseType: "blob",
  });
  return response.data;
};

export const uploadQuestionCsv = async (
  topicId: number,
  file: File
) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(
    `/faculty/topics/${topicId}/questions/import`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data;
};

export const getFacultyQuestions = async (topicId: number) => {
  const response = await api.get(`/faculty/topics/${topicId}/questions`);
  return response.data;
};

export const getImportJobDetails = async (importJobId: number) => {
  const response = await api.get(`/faculty/import-jobs/${importJobId}`);
  return response.data;
};

export const getQuestionImportHistory = async (topicId: number) => {
  const response = await api.get(`/faculty/topics/${topicId}/import-history`);
  return response.data;
};

// =========================
// EXAMS
// =========================
export const getFacultyExams = async () => {
  const response = await api.get("/faculty/exams");
  return response.data;
};

export const getFacultySections = async () => {
  const response = await api.get("/faculty/exams/sections");
  return response.data;
};

export const createExam = async (
  subjectId: number,
  data: any
) => {
  const response = await api.post(`/faculty/subjects/${subjectId}/exams`, data);
  return response.data;
};

export const updateExam = async (
  subjectId: number,
  examId: number,
  data: any
) => {
  const response = await api.put(
    `/faculty/subjects/${subjectId}/exams/${examId}`,
    data
  );
  return response.data;
};

export const getExamForEdit = async (
  subjectId: number,
  examId: number
) => {
  const response = await api.get(
    `/faculty/subjects/${subjectId}/exams/${examId}/edit`
  );
  return response.data;
};

export const archiveExam = async (examId: number) => {
  const response = await api.put(`/faculty/exams/${examId}/archive`);
  return response.data;
};

export const restoreExam = async (examId: number) => {
  const response = await api.put(`/faculty/exams/${examId}/restore`);
  return response.data;
};

export const cancelExam = async (examId: number) => {
  const response = await api.put(`/faculty/exams/${examId}/cancel`);
  return response.data;
};

export const getExamDraft = async (subjectId: number) => {
  const response = await api.get(
    `/faculty/subjects/${subjectId}/exams/draft`
  );
  return response.data;
};

export const saveExamDraft = async (
  subjectId: number,
  data: any
) => {
  const response = await api.post(
    `/faculty/subjects/${subjectId}/exams/draft`,
    data
  );
  return response.data;
};

export const deleteExamDraft = async (subjectId: number) => {
  const response = await api.delete(
    `/faculty/subjects/${subjectId}/exams/draft`
  );
  return response.data;
};

export const getExamSections = async (subjectId: number) => {
  const response = await api.get(
    `/faculty/subjects/${subjectId}/exams/sections`
  );
  return response.data;
};

export const getExamBuilderQuestions = async (subjectId: number, difficulty?: string) => {
  const response = await api.get(
    `/faculty/subjects/${subjectId}/exams/questions`,
    { params: difficulty ? { difficulty } : undefined }
  );
  return response.data;
};

// =========================
// ACTIVITY LOGS
// =========================
export const getFacultyActivityLogs = async (params: {
  page: number;
  limit: number;
  search: string;
  category: string;
  severity: string;
}) => {
  const response = await api.get("/faculty/activity-logs", { params });
  return response.data;
};

// =========================
// SUBJECTS
// =========================
export const getFacultySubjects = async () => {
  const response = await api.get("/faculty/subjects");
  return response.data;
};

export const getFacultySubjectById = async (subjectId: number) => {
  const response = await api.get(`/faculty/subjects/${subjectId}`);
  return response.data;
};

export const getSubjectAssessments = async (subjectId: number) => {
  const response = await api.get(
    `/faculty/subjects/${subjectId}/assessments`
  );
  return response.data;
};

export const getFacultyAssessmentDetails = async (
  subjectId: number,
  assessmentId: number
) => {
  const response = await api.get(
    `/faculty/subjects/${subjectId}/assessments/${assessmentId}`
  );
  return response.data;
};

export const getSubjectQuestionBank = async (subjectId: number) => {
  const response = await api.get(
    `/faculty/subjects/${subjectId}/question-bank`
  );
  return response.data;
};

// =========================
// TOPICS
// =========================
export const getFacultyTopics = async (subjectId: number) => {
  const response = await api.get(`/faculty/subjects/${subjectId}/topics`);
  return response.data;
};

// =========================
// DASHBOARD
// =========================
export const getFacultyDashboard = async () => {
  const response = await api.get("/faculty/dashboard");
  return response.data;
};

// =========================
export const changeFacultyPassword = async (passwords: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await api.patch("/faculty/password", passwords);

  return response.data;
};

// =========================
// EXAM PREFERENCES
// =========================
export const getFacultyExamPreferences = async () => {
  const response = await api.get("/faculty/settings/exam-preferences");

  return response.data;
};

export const updateFacultyExamPreferences = async (preferences: {
  examNotifications?: boolean;
  violationAlerts?: boolean;
  autoSubmitNotification?: boolean;
  studentProgressUpdates?: boolean;
}) => {
  const response = await api.patch("/faculty/settings/exam-preferences", preferences);

  return response.data;
};

// =========================
// NOTIFICATION SETTINGS
// =========================
export const getFacultyNotificationSettings = async () => {
  const response = await api.get("/faculty/settings/notifications");

  return response.data;
};

export const updateFacultyNotificationSettings = async (settings: {
  inAppNotifications?: boolean;
  dashboardAlerts?: boolean;
}) => {
  const response = await api.patch("/faculty/settings/notifications", settings);

  return response.data;
};
