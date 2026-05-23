import api from "@/lib/axios";

export const registerUser = async (data: {
  name: string;
  studentId: string;
  password: string;
}) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};

export const loginUser = async (data: {
  login: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};
