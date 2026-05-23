import express from "express";

import { getPendingStudents } from "../controllers/admin/approvals/getPendingStudents";

import { approveStudent } from "../controllers/admin/approvals/approveStudent";

import { rejectStudent } from "../controllers/admin/approvals/rejectStudent";

import { getDashboardStats } from "../controllers/admin/dashboard/getDashboardStats";

import { getRecentRegistrations } from "../controllers/admin/dashboard/getRecentRegistrations";

import { getRecentActivity } from "../controllers/admin/get_recent_activity_controller";

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

export default router;
