import api from "@/lib/axios";

export const getSections = async () => {
  const response = await api.get(
    "/admin/academic/sections"
  );

  return response.data;
};

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

export const getSectionById = async (id: number) => {
  const response = await api.get(
    `/admin/academic/sections/${id}`
  );

  return response.data;
};
