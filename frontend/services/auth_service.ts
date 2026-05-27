import api from "@/lib/axios";

export const registerUser = async (data: {
  studentId: string;
  password: string;
}) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};

export const loginUser = async (data: {
  identifier: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};

export const checkStatus = async (studentId: string) => {
  const response = await api.get(
    `/auth/status/${studentId}`
  );

  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};

export const changePassword = async (data: {
  currentPassword: string;

  newPassword: string;
}) => {
  const response = await api.patch(
    "/auth/change-password",
    data
  );

  return response.data;
};
