"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_middleware_1 = __importDefault(require("../middleware/upload_middleware"));
const get_pending_students_controller_1 = require("../controllers/admin/approvals/get_pending_students_controller");
const approve_student_controller_1 = require("../controllers/admin/approvals/approve_student_controller");
const reject_student_controller_1 = require("../controllers/admin/approvals/reject_student_controller");
const getDashboardStats_1 = require("../controllers/admin/dashboard/getDashboardStats");
const getRecentRegistrations_1 = require("../controllers/admin/dashboard/getRecentRegistrations");
const get_recent_activity_controller_1 = require("../controllers/admin/get_recent_activity_controller");
const get_users_controller_1 = require("../controllers/admin/get_users_controller");
const update_admin_user_controller_1 = require("../controllers/admin/users/update_admin_user_controller");
const upload_student_records_controller_1 = require("../controllers/admin/student_records/upload_student_records_controller");
const create_faculty_controller_1 = require("../controllers/admin/users/create_faculty_controller");
const get_activity_log_controller_1 = require("../controllers/admin/activity/get_activity_log_controller");
const auth_middleware_1 = require("../middleware/auth_middleware");
const role_middleware_1 = require("../middleware/role_middleware");
const admin_activity_logger_middleware_1 = require("../middleware/admin_activity_logger_middleware");
const create_section_controller_1 = require("../controllers/admin/academic/sections/create_section_controller");
const get_sections_controller_1 = require("../controllers/admin/academic/sections/get_sections_controller");
const get_section_by_id_controller_1 = require("../controllers/admin/academic/sections/get_section_by_id_controller");
const get_student_records_controller_1 = require("../controllers/admin/academic/sections/get_student_records_controller");
const assign_section_controller_1 = require("../controllers/admin/academic/student_records/assign_section_controller");
const unassign_section_controller_1 = require("../controllers/admin/academic/student_records/unassign_section_controller");
const archive_subject_controller_1 = require("../controllers/admin/academic/subjects/archive_subject_controller");
const restore_subject_controller_1 = require("../controllers/admin/academic/subjects/restore_subject_controller");
const get_subjects_controller_1 = require("../controllers/admin/academic/subjects/get_subjects_controller");
const assign_subject_section_controller_1 = require("../controllers/admin/academic/subjects/assign_subject_section_controller");
const create_subject_controller_1 = require("../controllers/admin/academic/subjects/create_subject_controller");
const update_subject_controller_1 = require("../controllers/admin/academic/subjects/update_subject_controller");
const assign_faculties_to_subject_controller_1 = require("../controllers/admin/academic/subjects/assign_faculties_to_subject_controller");
const archive_section_controller_1 = require("../controllers/admin/academic/sections/archive_section_controller");
const restore_section_controller_1 = require("../controllers/admin/academic/sections/restore_section_controller");
const update_section_controller_1 = require("../controllers/admin/academic/sections/update_section_controller");
const get_subject_by_id_controller_1 = require("../controllers/admin/academic/subjects/get_subject_by_id_controller");
const get_subject_assessments_controller_1 = require("../controllers/admin/academic/assessments/get_subject_assessments_controller");
const get_subject_questions_controller_1 = require("../controllers/admin/academic/questions/get_subject_questions_controller");
const get_subject_question_stats_controller_1 = require("../controllers/admin/academic/questions/get_subject_question_stats_controller");
const get_assessment_details_controller_1 = require("../controllers/admin/academic/assessments/get_assessment_details_controller");
const get_subject_assessment_summary_controller_1 = require("../controllers/admin/academic/assessments/get_subject_assessment_summary_controller");
const get_section_question_bank_stats_controller_1 = require("../controllers/admin/academic/sections/get_section_question_bank_stats_controller");
const get_admin_sections_with_exams_controller_1 = require("../controllers/admin/exams/get_admin_sections_with_exams_controller");
const get_section_students_controller_1 = require("../controllers/admin/academic/sections/get_section_students_controller");
const get_section_exams_controller_1 = require("../controllers/admin/academic/sections/get_section_exams_controller");
const get_section_subjects_controller_1 = require("../controllers/admin/academic/sections/get_section_subjects_controller");
const get_question_bank_controller_1 = require("../controllers/admin/academic/questions/get_question_bank_controller");
const get_question_details_by_id_controller_1 = require("../controllers/admin/academic/questions/get_question_details_by_id_controller");
const get_subject_analytics_controller_1 = require("../controllers/admin/academic/subjects/get_subject_analytics_controller");
const get_admin_section_exam_details_controller_1 = require("../controllers/admin/exams/get_admin_section_exam_details_controller");
const resolve_violation_controller_1 = require("../controllers/admin/exams/resolve_violation_controller");
const get_system_settings_controller_1 = require("../controllers/admin/settings/get_system_settings_controller");
const update_system_settings_controller_1 = require("../controllers/admin/settings/update_system_settings_controller");
const update_security_policies_controller_1 = require("../controllers/admin/settings/update_security_policies_controller");
const update_notification_settings_controller_1 = require("../controllers/admin/settings/update_notification_settings_controller");
const change_password_controller_1 = require("../controllers/admin/settings/change_password_controller");
const get_login_history_controller_1 = require("../controllers/admin/settings/get_login_history_controller");
const get_recent_logins_controller_1 = require("../controllers/admin/settings/get_recent_logins_controller");
const get_assessment_analytics_controller_1 = require("../controllers/admin/academic/assessments/get_assessment_analytics_controller");
const get_exam_violations_details_controller_1 = require("../controllers/admin/academic/exams/get_exam_violations_details_controller");
const get_exam_details_controller_1 = require("../controllers/admin/academic/exams/get_exam_details_controller");
const getStudentProfileController_1 = require("../controllers/admin/academic/students/getStudentProfileController");
const getSectionSubjectDetailsController_1 = require("../controllers/admin/academic/sections/getSectionSubjectDetailsController");
const get_admin_exams_controller_1 = require("../controllers/admin/exams/get_admin_exams_controller");
const get_admin_exam_monitoring_details_controller_1 = require("../controllers/admin/exams/get_admin_exam_monitoring_details_controller");
const exam_actions_controller_1 = require("../controllers/admin/exams/exam_actions_controller");
const router = express_1.default.Router();
router.use(auth_middleware_1.authMiddleware, (0, role_middleware_1.authorizeRoles)("ADMIN"));
router.use(admin_activity_logger_middleware_1.adminActivityLogger);
// DASHBOARD
router.get("/dashboard/stats", getDashboardStats_1.getDashboardStats);
router.get("/dashboard/recent-registrations", getRecentRegistrations_1.getRecentRegistrations);
// APPROVALS
router.get("/pending-students", get_pending_students_controller_1.getPendingStudents);
router.patch("/approve/:id", approve_student_controller_1.approveStudent);
router.patch("/reject/:id", reject_student_controller_1.rejectStudent);
// Activity
router.get("/recent-activity", get_recent_activity_controller_1.getRecentActivity);
router.get("/activity-logs", get_activity_log_controller_1.getActivityLogs);
// Users Management
router.get("/users", get_users_controller_1.getUsers);
router.patch("/users/:id", update_admin_user_controller_1.updateAdminUserController);
router.post("/faculty", create_faculty_controller_1.createFaculty);
// Create Faculty
router.post("/faculty", create_faculty_controller_1.createFaculty);
// Sections
router.get("/academic/sections", get_sections_controller_1.getSections);
router.post("/academic/sections", create_section_controller_1.createSection);
router.get("/academic/sections/:id", get_section_by_id_controller_1.getSectionById);
router.get("/academic/sections/:sectionId/students", get_section_students_controller_1.getSectionStudentsController);
router.get("/academic/sections/:sectionId/exams", get_section_exams_controller_1.getSectionExamsController);
router.get("/academic/sections/:sectionId/subjects", get_section_subjects_controller_1.getSectionSubjectsController);
router.get("/academic/sections/:sectionId/questions", get_question_bank_controller_1.getQuestionBankController);
router.get("/academic/student-records", get_student_records_controller_1.getStudentRecords);
router.patch("/academic/sections/:id/archive", archive_section_controller_1.archiveSection);
router.patch("/academic/sections/:id/restore", restore_section_controller_1.restoreSection);
router.patch("/academic/sections/:id", update_section_controller_1.updateSection);
router.get("/academic/sections/:id/question-bank/stats", get_section_question_bank_stats_controller_1.getSectionQuestionBankStatsController);
// Student Records
router.patch("/academic/student-records/:id/assign-section", assign_section_controller_1.assignSection);
router.patch("/academic/student-records/:id/unassign-section", unassign_section_controller_1.unassignSection);
// Student ID upload (CSV)
router.post("/student-records/upload", upload_middleware_1.default.single("file"), upload_student_records_controller_1.uploadStudentRecords);
// Subjects
router.get("/academic/subjects/:id", get_subject_by_id_controller_1.getSubjectByIdController);
router.patch("/academic/subjects/:id/archive", archive_subject_controller_1.archiveSubject);
router.patch("/academic/subjects/:id/restore", restore_subject_controller_1.restoreSubject);
router.patch("/academic/subjects/:id/assign-sections", assign_subject_section_controller_1.assignSubjectSections);
router.patch("/academic/subjects/:id", update_subject_controller_1.updateSubject);
router.patch("/academic/subjects/:id/assign-faculties", assign_faculties_to_subject_controller_1.assignFacultiesToSubject);
router.get("/academic/subjects", get_subjects_controller_1.getSubjects);
router.post("/academic/subjects", create_subject_controller_1.createSubject);
router.get("/academic/subjects/:id/assessments", get_subject_assessments_controller_1.getSubjectAssessmentsController);
router.get("/academic/subjects/:subjectId/analytics", get_subject_analytics_controller_1.getSubjectAnalyticsController);
router.get("/academic/subjects/:id/questions", get_subject_questions_controller_1.getSubjectQuestionsController);
router.get("/academic/subjects/:id/questions/stats", get_subject_question_stats_controller_1.getSubjectQuestionStatsController);
router.get("/academic/questions/:questionId", get_question_details_by_id_controller_1.getQuestionDetailsByIdController);
router.get("/academic/assessments/:assessmentId", get_assessment_details_controller_1.getAssessmentDetailsController);
router.get("/academic/subjects/:id/assessments/summary", get_subject_assessment_summary_controller_1.getSubjectAssessmentSummaryController);
// Exam Monitoring Routes
router.get("/exams", get_admin_exams_controller_1.getAdminExamsController);
router.get("/exams/sections", get_admin_sections_with_exams_controller_1.getAdminSectionsWithExamsController);
router.get("/exams/sections/:sectionId", get_admin_section_exam_details_controller_1.getAdminSectionExamDetailsController);
router.get("/exams/:examId", get_exam_details_controller_1.getExamDetailsController);
router.get("/exams/:examId/monitoring", get_admin_exam_monitoring_details_controller_1.getAdminExamMonitoringDetailsController);
router.get("/exams/:examId/violations", get_exam_violations_details_controller_1.getExamViolationsDetailsController);
router.post("/exams/:examId/end", exam_actions_controller_1.adminEndExamController);
router.post("/exams/:examId/flag-student", exam_actions_controller_1.adminFlagStudentController);
router.post("/exams/:examId/unlock-student", exam_actions_controller_1.adminUnlockStudentController);
router.post("/exams/:examId/notify-student", exam_actions_controller_1.adminNotifyStudentController);
router.post("/exams/:examId/announcement", exam_actions_controller_1.adminSendAnnouncementController);
router.patch("/violations/:violationId/resolve", resolve_violation_controller_1.resolveViolationController);
// Assessment Analytics
router.get("/academic/sections/:sectionId/subjects/:subjectId/assessments/analytics", get_assessment_analytics_controller_1.getAssessmentAnalyticsController);
// Phase 4: Student & Profile Details
router.get("/students/:studentId/profile", getStudentProfileController_1.getStudentProfileController);
router.get("/academic/sections/:sectionId/subjects/:subjectId/details", getSectionSubjectDetailsController_1.getSectionSubjectDetailsController);
// Settings Routes
router.get("/settings", get_system_settings_controller_1.getSystemSettingsController);
router.patch("/settings", update_system_settings_controller_1.updateSystemSettingsController);
router.patch("/settings/security", update_security_policies_controller_1.updateSecurityPoliciesController);
router.patch("/settings/notifications", update_notification_settings_controller_1.updateNotificationSettingsController);
router.patch("/password", change_password_controller_1.changePasswordController);
// Login History Routes
router.get("/login-history", get_login_history_controller_1.getLoginHistoryController);
router.get("/login-history/recent", get_recent_logins_controller_1.getRecentLoginsController);
exports.default = router;
