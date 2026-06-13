import api from "@/lib/axios";

import type { AuthUser } from "@/types/auth/auth";

interface ProfileResponse {
  message: string;
  user: AuthUser;
}

export const updateProfile = async (data: {
  name?: string;
  username?: string;
}) => {
  const response = await api.patch<ProfileResponse>("/auth/profile", data);

  return response.data;
};

export const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await api.post<ProfileResponse>(
    "/auth/avatar",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

export const deleteAvatar = async () => {
  const response = await api.delete<ProfileResponse>("/auth/avatar");

  return response.data;
};

export const fetchAvatarBlob = async () => {
  const response = await api.get<Blob>("/auth/avatar", {
    responseType: "blob",
  });

  return response.data;
};
