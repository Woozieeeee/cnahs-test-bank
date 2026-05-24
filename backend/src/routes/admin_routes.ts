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

const router = express.Router();

// DASHBOARD

router.get("/dashboard/stats", getDashboardStats);

router.get("/dashboard/recent-registrations", getRecentRegistrations);

// APPROVALS

router.get("/pending-students", getPendingStudents);

router.patch("/approve/:id", approveStudent);

router.patch("/reject/:id", rejectStudent);

// Activity

router.get("/recent-activity", getRecentActivity);

// Users Management

router.get("/users", getUsers);

// Student ID upload (CSV)

router.post(
  "/student-records/upload",
  upload.single("file"),
  uploadStudentRecords,
);

export default router;
