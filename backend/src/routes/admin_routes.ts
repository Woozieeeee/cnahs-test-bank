import express from "express";
import { getPendingStudents } from "../controllers/admin/approvals/get_pending_students_controller";
import { approveStudent } from "../controllers/admin/approvals/approve_student_controller";
import { rejectStudent } from "../controllers/admin/approvals/reject_student_controller";
import { getDashboardStats } from "../controllers/admin/dashboard/getDashboardStats";
import { getRecentRegistrations } from "../controllers/admin/dashboard/getRecentRegistrations";
import { getRecentActivity } from "../controllers/admin/get_recent_activity_controller";
import { getUsers } from "../controllers/admin/get_users_controller";
import upload from "../middleware/upload_middleware";
import { uploadStudentRecords } from "../controllers/admin/student_records/upload_student_records_controller";
import { createFaculty } from "../controllers/admin/users/create_faculty_controller";
import { getActivityLogs } from "../controllers/admin/activity/get_activity_log_controller";
import { authMiddleware } from "../middleware/auth_middleware";
import { authorizeRoles } from "../middleware/role_middleware";
import { adminActivityLogger } from "../middleware/admin_activity_logger_middleware";
import { createSection } from "../controllers/admin/academic/sections/create_section_controller";
import { getSections } from "../controllers/admin/academic/sections/get_sections_controller";
import { getSectionById } from "../controllers/admin/academic/sections/get_section_by_id_controller";

const router = express.Router();

router.use(authMiddleware, authorizeRoles("ADMIN"));
router.use(adminActivityLogger);

// DASHBOARD
router.get("/dashboard/stats", getDashboardStats);
router.get("/dashboard/recent-registrations", getRecentRegistrations);

// APPROVALS
router.get("/pending-students", getPendingStudents);
router.patch("/approve/:id", approveStudent);
router.patch("/reject/:id", rejectStudent);

// Activity
router.get("/recent-activity", getRecentActivity);
router.get("/activity-logs", getActivityLogs);

// Users Management
router.get("/users", getUsers);
router.post("/faculty", createFaculty);

// Create Faculty
router.post("/faculty", createFaculty);

// Academic Management
router.get("/academic/sections", getSections);
router.post("/academic/sections", createSection);
router.get("/academic/sections/:id", getSectionById);

// Student ID upload (CSV)
router.post(
  "/student-records/upload",
  upload.single("file"),
  uploadStudentRecords,
);

export default router;
