import api from "@/lib/axios";

// =========================
// GET PENDING STUDENTS
// =========================

export const getPendingStudents = async () => {
  const response = await api.get("/admin/pending-students");

  return response.data;
};

// =========================
// APPROVE STUDENT
// =========================

export const approveStudent = async (id: number) => {
  const response = await api.patch(`/admin/approve/${id}`);

  return response.data;
};

// =========================
// REJECT STUDENT
// =========================

export const rejectStudent = async (id: number) => {
  const response = await api.patch(`/admin/reject/${id}`);

  return response.data;
};

// =========================
// DASHBOARD STATS
// =========================

export const getDashboardStats = async () => {
  const response = await api.get("/admin/dashboard/stats");

  return response.data;
};

// =========================
// RECENT REGISTRATIONS
// =========================

export const getRecentRegistrations = async () => {
  const response = await api.get(
    "/admin/dashboard/recent-registrations"
  );

  return response.data;
};

// =========================
// RECENT ACTIVITY
// =========================

export const getRecentActivity = async () => {
  const response = await api.get("/admin/recent-activity");

  return response.data;
};

// =========================
// USERS MANAGEMENT
// =========================

export const getUsers = async (page = 1, limit = 10) => {
  const response = await api.get(
    `/admin/users?page=${page}&limit=${limit}`
  );

  return response.data;
};
