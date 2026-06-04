import api from "@/lib/axios";
import { ImportSummary } from "@/types/importSummary";

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

// =========================
// GET FACULTY QUESTIONS
// =========================

export const getFacultyQuestions = async (
  topicId: number
) => {
  const response = await api.get(
    `/faculty/topics/${topicId}/questions`
  );

  return response.data;
};

// =========================
// RESTORE FACULTY QUESTION
// =========================

export const restoreFacultyQuestion = async (
  questionId: number
) => {
  const response = await api.put(
    `/faculty/questions/${questionId}/restore`
  );

  return response.data;
};

// =========================
// ARCHIVE FACULTY QUESTION
// =========================

export const archiveFacultyQuestion = async (
  questionId: number
) => {
  const response = await api.put(
    `/faculty/questions/${questionId}/archive`
  );

  return response.data;
};

// =========================
// CREATE FACULTY QUESTION
// =========================

export const createFacultyQuestion = async (
  topicId: number,
  data: {
    question: string;

    explanation?: string;

    difficulty: string;

    options: string[];

    correctAnswer: string;
  }
) => {
  const response = await api.post(
    `/faculty/topics/${topicId}/questions`,
    data
  );

  return response.data;
};

// =========================
// UPDATE FACULTY QUESTION
// =========================

export const updateFacultyQuestion = async (
  questionId: number,
  data: {
    question: string;

    explanation?: string;

    difficulty: string;

    correctAnswer: string;

    options: string[];
  }
) => {
  const response = await api.put(
    `/faculty/questions/${questionId}`,
    data
  );

  return response.data;
};

// =========================
// GET QUESTION IMPORT HISTORY
// =========================

export const getQuestionImportHistory = async (
  topicId: number
) => {
  const response = await api.get(
    `/faculty/topics/${topicId}/import-history`
  );

  return response.data;
};

// =========================
// UPLOAD QUESTION CSV
// =========================

export const uploadQuestionCsv = async (
  topicId: number,
  file: File
): Promise<ImportSummary> => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    `/faculty/questions/import/${topicId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// =============================
// DOWNLOAD QUESTION CSV TEMPLATE
// =============================

export const downloadQuestionTemplate = async (
  topicId: number
) => {
  const response = await api.get(
    `/faculty/topics/${topicId}/questions/template`,
    {
      responseType: "blob",
    }
  );

  const blob = new Blob([response.data], {
    type: "text/csv",
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = "question-import-template.csv";

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
};
