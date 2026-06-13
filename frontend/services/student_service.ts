import api from "@/lib/axios";

// =========================
// PREFERENCES
// =========================
export const getStudentPreferences = async () => {
  const response = await api.get("/student/settings/preferences");
  return response.data;
};

export const updateStudentPreferences = async (preferences: {
  pushNotifications?: boolean;
  examReminders?: boolean;
  soundEnabled?: boolean;
  studyGoals?: boolean;
  analyticsTracking?: boolean;
}) => {
  const response = await api.patch("/student/settings/preferences", preferences);
  return response.data;
};
