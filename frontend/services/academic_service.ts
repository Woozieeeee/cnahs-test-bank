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
  name: string;

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
