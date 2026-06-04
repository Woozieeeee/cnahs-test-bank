import api from "@/lib/axios";

// GET EXAM BY ID

export const getExamById = async (id: number) => {
  const response = await api.get(
    `/admin/academic/exams/${id}`
  );

  return response.data;
};
