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
