"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_dashboard_controller_1 = require("../controllers/student/student_dashboard_controller");
const student_subject_details_controller_1 = require("../controllers/student/student_subject_details_controller");
const student_progress_controller_1 = require("../controllers/student/student_progress_controller");
const student_exam_controller_1 = require("../controllers/student/student_exam_controller");
const submit_exam_controller_1 = require("../controllers/student/submit_exam_controller");
const record_exam_violation_controller_1 = require("../controllers/student/record_exam_violation_controller");
const student_preferences_controller_1 = require("../controllers/student/settings/student_preferences_controller");
const auth_middleware_1 = require("../middleware/auth_middleware");
const role_middleware_1 = require("../middleware/role_middleware");
const router = express_1.default.Router();
// All student routes require authentication
router.use(auth_middleware_1.authMiddleware);
router.use((0, role_middleware_1.authorizeRoles)("STUDENT"));
// Dashboard route
router.get("/dashboard", student_dashboard_controller_1.getDashboard);
// Subject details route
router.get("/subjects/:subjectId", student_subject_details_controller_1.getSubjectDetailsController);
// Progress route
router.get("/progress", student_progress_controller_1.getProgressController);
// Exam details route - returns exam data with faculty-configured settings
router.get("/exams/:examId", student_exam_controller_1.getExamController);
// Submit exam route
router.post("/exams/:examId/submit", submit_exam_controller_1.submitExamController);
// Record live exam security violation
router.post("/exams/:examId/violations", record_exam_violation_controller_1.recordStudentExamViolationController);
// Settings Routes
router.get("/settings/preferences", student_preferences_controller_1.getStudentPreferencesController);
router.patch("/settings/preferences", student_preferences_controller_1.updateStudentPreferencesController);
exports.default = router;
