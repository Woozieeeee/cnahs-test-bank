import api from "@/lib/axios";

// GET SECTION

export const getSections = async () => {
  const response = await api.get(
    "/admin/academic/sections"
  );

  return response.data;
};

// CREATE SECTION

export const createSection = async (data: {
  sectionCode: string;
  yearLevel: number;
  program: string;
}) => {
  const response = await api.post(
    "/admin/academic/sections",
    data
  );

  return response.data;
};

// GET SECTION BY ID

export const getSectionById = async (id: number) => {
  const response = await api.get(
    `/admin/academic/sections/${id}`
  );

  return response.data;
};

// ASSIGN STUDENT TO SECTION

export const assignStudentSection = async (
  studentRecordId: number,

  sectionId: number
) => {
  const response = await api.patch(
    `/admin/academic/student-records/${studentRecordId}/assign-section`,
    {
      sectionId,
    }
  );

  return response.data;
};

// GET STUDENTS RECORDS

export const getStudentRecords = async () => {
  const response = await api.get(
    "/admin/academic/student-records"
  );

  return response.data;
};

// =========================
// UPLOAD STUDENT RECORDS
// =========================

export const uploadStudentRecords = async (file: File) => {
  const formData = new FormData();

  formData.append(
    "file",

    file
  );

  const response = await api.post(
    "/admin/academic/student-records/upload",

    formData,

    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// =========================
// CREATE STUDENT RECORD
// =========================

export const createStudentRecord = async (data: {
  studentId: string;

  firstName: string;

  middleName?: string;

  lastName: string;

  suffix?: string;

  program: string;
}) => {
  const response = await api.post(
    "/admin/academic/student-records",
    data
  );

  return response.data;
};

// =========================
// UPDATE STUDENT RECORD
// =========================

export const updateStudentRecord = async (
  id: number,

  data: {
    studentId: string;

    firstName: string;

    middleName?: string;

    lastName: string;

    suffix?: string;

    program: string;
  }
) => {
  const response = await api.patch(
    `/admin/academic/student-records/${id}`,

    data
  );

  return response.data;
};

// =========================
// ARCHIVE SUBJECTS
// =========================

export const archiveSubject = async (id: number) => {
  const response = await api.patch(
    `/admin/academic/subjects/${id}/archive`
  );

  return response.data;
};

// =========================
// RESTORE SUBJECTS
// =========================

export const restoreSubject = async (id: number) => {
  const response = await api.patch(
    `/admin/academic/subjects/${id}/restore`
  );

  return response.data;
};

export const getSubjects = async (tab: string) => {
  const response = await api.get(
    `/admin/academic/subjects?tab=${tab}`
  );

  return response.data;
};

// =========================
// ASSIGN SUBJECTS TO SECTION
// =========================

export const assignSubjectSections = async (
  subjectId: number,
  sectionIds: number[]
) => {
  const response = await api.patch(
    `/admin/academic/subjects/${subjectId}/assign-sections`,
    {
      sectionIds,
    }
  );

  return response.data;
};

// =========================
// CREATE SUBJECTS
// =========================

export const createSubject = async (data: {
  name: string;

  code: string;

  description: string;
}) => {
  const response = await api.post(
    "/admin/academic/subjects",
    data
  );

  return response.data;
};

// =========================
// UPDATE SUBJECTS
// =========================

export const updateSubject = async (
  id: number,
  data: {
    name: string;

    code: string;

    description?: string;
  }
) => {
  const response = await api.patch(
    `/admin/academic/subjects/${id}`,
    data
  );

  return response.data;
};

export const assignFacultyToSubject = async (
  subjectId: number,
  facultyId: number
) => {
  const response = await api.patch(
    `/admin/academic/subjects/${subjectId}/assign-faculty`,
    {
      facultyId,
    }
  );

  return response.data;
};
