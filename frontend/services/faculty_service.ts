import api from "@/lib/axios";

// =========================
// GET STUDENT DASHBOARD
// =========================

export const getFacultyDashboard = async () => {
  const response = await api.get("/faculty/dashboard");

  return response.data;
};

// =========================
// GET FACULTY SUBJECTS
// =========================

export const getFacultySubjects = async () => {
  const response = await api.get("/faculty/subjects");

  return response.data;
};

// =========================
// GET FACULTY SUBJECTS BY ID
// =========================

export const getFacultySubjectById = async (
  subjectId: number
) => {
  const response = await api.get(
    `/faculty/subjects/${subjectId}`
  );

  return response.data;
};

// =========================
// GET FACULTY TOPICS
// =========================

export const getFacultyTopics = async (
  subjectId: number
) => {
  const response = await api.get(
    `/faculty/subjects/${subjectId}/topics`
  );

  return response.data;
};

// =========================
// CREATE FACULTY TOPIC
// =========================

export const createFacultyTopic = async (
  subjectId: number,
  data: {
    name: string;
    description?: string;
  }
) => {
  const response = await api.post(
    `/faculty/subjects/${subjectId}/topics`,
    data
  );

  return response.data;
};

// =========================
// UPDATE FACULTY TOPIC
// =========================

export const updateFacultyTopic = async (
  topicId: number,
  data: {
    name: string;
    description?: string;
  }
) => {
  const response = await api.put(
    `/faculty/topics/${topicId}`,
    data
  );

  return response.data;
};

// =========================
// ARCHIVE FACULTY TOPIC
// =========================

export const archiveFacultyTopic = async (
  topicId: number
) => {
  const response = await api.put(
    `/faculty/topics/${topicId}/archive`
  );

  return response.data;
};

// =========================
// RESTORE FACULTY TOPIC
// =========================

export const restoreFacultyTopic = async (
  topicId: number
) => {
  const response = await api.put(
    `/faculty/topics/${topicId}/restore`
  );

  return response.data;
};
