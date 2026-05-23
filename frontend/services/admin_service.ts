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

export const approveStudent = async (id: string) => {
  const response = await api.patch(`/admin/approve/${id}`);

  return response.data;
};

// =========================
// REJECT STUDENT
// =========================

export const rejectStudent = async (id: string) => {
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
