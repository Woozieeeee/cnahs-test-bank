import express from "express";
import { getDashboard } from "../controllers/student/student_dashboard_controller";
import { getSubjectDetailsController } from "../controllers/student/student_subject_details_controller";
import { getProgressController } from "../controllers/student/student_progress_controller";
import { getExamController } from "../controllers/student/student_exam_controller";
import { submitExamController } from "../controllers/student/submit_exam_controller";
import { recordStudentExamViolationController } from "../controllers/student/record_exam_violation_controller";
import { getStudentPreferencesController, updateStudentPreferencesController } from "../controllers/student/settings/student_preferences_controller";
import {authMiddleware} from "../middleware/auth_middleware";
import { authorizeRoles } from "../middleware/role_middleware";

const router = express.Router();

// All student routes require authentication
router.use(authMiddleware);
router.use(authorizeRoles("STUDENT"));

// Dashboard route
router.get("/dashboard", getDashboard);

// Subject details route
router.get("/subjects/:subjectId", getSubjectDetailsController);

// Progress route
router.get("/progress", getProgressController);

// Exam details route - returns exam data with faculty-configured settings
router.get("/exams/:examId", getExamController);

// Submit exam route
router.post("/exams/:examId/submit", submitExamController);

// Record live exam security violation
router.post("/exams/:examId/violations", recordStudentExamViolationController);

// Settings Routes
router.get("/settings/preferences", getStudentPreferencesController);
router.patch("/settings/preferences", updateStudentPreferencesController);

export default router;