import api from "@/lib/axios";

export const recordExamViolation = async (data: {
  violation: string;

  metadata?: Record<string, unknown>;
}) => {
  const response = await api.post("/exam/violations", data);

  return response.data;
};
