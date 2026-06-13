import express from "express";
import upload from "../middleware/upload_middleware";
import { getPendingStudents } from "../controllers/admin/approvals/get_pending_students_controller";
import { approveStudent } from "../controllers/admin/approvals/approve_student_controller";
import { rejectStudent } from "../controllers/admin/approvals/reject_student_controller";
import { getDashboardStats } from "../controllers/admin/dashboard/getDashboardStats";
import { getRecentRegistrations } from "../controllers/admin/dashboard/getRecentRegistrations";
import { getRecentActivity } from "../controllers/admin/get_recent_activity_controller";
import { getUsers } from "../controllers/admin/get_users_controller";
import { updateAdminUserController } from "../controllers/admin/users/update_admin_user_controller";
import { uploadStudentRecords } from "../controllers/admin/student_records/upload_student_records_controller";
import { createFaculty } from "../controllers/admin/users/create_faculty_controller";
import { getActivityLogs } from "../controllers/admin/activity/get_activity_log_controller";
import { authMiddleware } from "../middleware/auth_middleware";
import { authorizeRoles } from "../middleware/role_middleware";
import { adminActivityLogger } from "../middleware/admin_activity_logger_middleware";
import { createSection } from "../controllers/admin/academic/sections/create_section_controller";
import { getSections } from "../controllers/admin/academic/sections/get_sections_controller";
import { getSectionById } from "../controllers/admin/academic/sections/get_section_by_id_controller";
import { getStudentRecords } from "../controllers/admin/academic/sections/get_student_records_controller";
import { assignSection } from "../controllers/admin/academic/student_records/assign_section_controller";
import { unassignSection } from "../controllers/admin/academic/student_records/unassign_section_controller";
import { archiveSubject } from "../controllers/admin/academic/subjects/archive_subject_controller";
import { restoreSubject } from "../controllers/admin/academic/subjects/restore_subject_controller";
import { getSubjects } from "../controllers/admin/academic/subjects/get_subjects_controller";
import { assignSubjectSections } from "../controllers/admin/academic/subjects/assign_subject_section_controller";
import { createSubject } from "../controllers/admin/academic/subjects/create_subject_controller";
import { updateSubject } from "../controllers/admin/academic/subjects/update_subject_controller";
import { assignFacultiesToSubject } from "../controllers/admin/academic/subjects/assign_faculties_to_subject_controller";
import { archiveSection } from "../controllers/admin/academic/sections/archive_section_controller";
import { restoreSection } from "../controllers/admin/academic/sections/restore_section_controller";
import { updateSection } from "../controllers/admin/academic/sections/update_section_controller";
import { getSubjectByIdController } from "../controllers/admin/academic/subjects/get_subject_by_id_controller";
import { getSubjectAssessmentsController } from "../controllers/admin/academic/assessments/get_subject_assessments_controller";
import { getSubjectQuestionsController } from "../controllers/admin/academic/questions/get_subject_questions_controller";
import { getSubjectQuestionStatsController } from "../controllers/admin/academic/questions/get_subject_question_stats_controller";
import { getAssessmentDetailsController } from "../controllers/admin/academic/assessments/get_assessment_details_controller";
import { getSubjectAssessmentSummaryController } from "../controllers/admin/academic/assessments/get_subject_assessment_summary_controller";
import { getSectionQuestionBankStatsController } from "../controllers/admin/academic/sections/get_section_question_bank_stats_controller";
import { getAdminSectionsWithExamsController } from "../controllers/admin/exams/get_admin_sections_with_exams_controller";
import { getSectionStudentsController } from "../controllers/admin/academic/sections/get_section_students_controller";
import { getSectionExamsController } from "../controllers/admin/academic/sections/get_section_exams_controller";
import { getSectionSubjectsController } from "../controllers/admin/academic/sections/get_section_subjects_controller";
import { getQuestionBankController } from "../controllers/admin/academic/questions/get_question_bank_controller";
import { getQuestionDetailsByIdController } from "../controllers/admin/academic/questions/get_question_details_by_id_controller";
import { getSubjectAnalyticsController } from "../controllers/admin/academic/subjects/get_subject_analytics_controller";
import { getAdminSectionExamDetailsController } from "../controllers/admin/exams/get_admin_section_exam_details_controller";
import { resolveViolationController } from "../controllers/admin/exams/resolve_violation_controller";
import { getSystemSettingsController } from "../controllers/admin/settings/get_system_settings_controller";
import { updateSystemSettingsController } from "../controllers/admin/settings/update_system_settings_controller";
import { updateSecurityPoliciesController } from "../controllers/admin/settings/update_security_policies_controller";
import { updateNotificationSettingsController } from "../controllers/admin/settings/update_notification_settings_controller";
import { changePasswordController } from "../controllers/admin/settings/change_password_controller";
import { getLoginHistoryController } from "../controllers/admin/settings/get_login_history_controller";
import { getRecentLoginsController } from "../controllers/admin/settings/get_recent_logins_controller";
import { getAssessmentAnalyticsController } from "../controllers/admin/academic/assessments/get_assessment_analytics_controller";
import { getExamViolationsDetailsController } from "../controllers/admin/academic/exams/get_exam_violations_details_controller";
import { getExamDetailsController } from "../controllers/admin/academic/exams/get_exam_details_controller";
import { getStudentProfileController } from "../controllers/admin/academic/students/getStudentProfileController";
import { getSectionSubjectDetailsController } from "../controllers/admin/academic/sections/getSectionSubjectDetailsController";
import { getAdminExamsController } from "../controllers/admin/exams/get_admin_exams_controller";
import { getAdminExamMonitoringDetailsController } from "../controllers/admin/exams/get_admin_exam_monitoring_details_controller";
import {
  adminEndExamController,
  adminFlagStudentController,
  adminUnlockStudentController,
  adminNotifyStudentController,
  adminSendAnnouncementController,
} from "../controllers/admin/exams/exam_actions_controller";

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
router.patch("/users/:id", updateAdminUserController);
router.post("/faculty", createFaculty);

// Create Faculty
router.post("/faculty", createFaculty);

// Sections
router.get("/academic/sections", getSections);
router.post("/academic/sections", createSection);
router.get("/academic/sections/:id", getSectionById);
router.get(
  "/academic/sections/:sectionId/students",
  getSectionStudentsController,
);
router.get("/academic/sections/:sectionId/exams", getSectionExamsController);
router.get(
  "/academic/sections/:sectionId/subjects",
  getSectionSubjectsController,
);
router.get(
  "/academic/sections/:sectionId/questions",
  getQuestionBankController,
);
router.get("/academic/student-records", getStudentRecords);
router.patch("/academic/sections/:id/archive", archiveSection);
router.patch("/academic/sections/:id/restore", restoreSection);
router.patch("/academic/sections/:id", updateSection);
router.get(
  "/academic/sections/:id/question-bank/stats",
  getSectionQuestionBankStatsController,
);

// Student Records
router.patch("/academic/student-records/:id/assign-section", assignSection);
router.patch("/academic/student-records/:id/unassign-section", unassignSection);

// Student ID upload (CSV)
router.post(
  "/student-records/upload",
  upload.single("file"),
  uploadStudentRecords,
);

// Subjects
router.get("/academic/subjects/:id", getSubjectByIdController);
router.patch("/academic/subjects/:id/archive", archiveSubject);
router.patch("/academic/subjects/:id/restore", restoreSubject);
router.patch("/academic/subjects/:id/assign-sections", assignSubjectSections);
router.patch("/academic/subjects/:id", updateSubject);
router.patch(
  "/academic/subjects/:id/assign-faculties",
  assignFacultiesToSubject,
);
router.get("/academic/subjects", getSubjects);
router.post("/academic/subjects", createSubject);
router.get(
  "/academic/subjects/:id/assessments",
  getSubjectAssessmentsController,
);
router.get(
  "/academic/subjects/:subjectId/analytics",
  getSubjectAnalyticsController,
);
router.get("/academic/subjects/:id/questions", getSubjectQuestionsController);
router.get(
  "/academic/subjects/:id/questions/stats",
  getSubjectQuestionStatsController,
);
router.get("/academic/questions/:questionId", getQuestionDetailsByIdController);
router.get(
  "/academic/assessments/:assessmentId",
  getAssessmentDetailsController,
);
router.get(
  "/academic/subjects/:id/assessments/summary",
  getSubjectAssessmentSummaryController,
);

// Exam Monitoring Routes
router.get("/exams", getAdminExamsController);
router.get("/exams/sections", getAdminSectionsWithExamsController);
router.get("/exams/sections/:sectionId", getAdminSectionExamDetailsController);
router.get("/exams/:examId", getExamDetailsController);
router.get(
  "/exams/:examId/monitoring",
  getAdminExamMonitoringDetailsController,
);
router.get("/exams/:examId/violations", getExamViolationsDetailsController);
router.post("/exams/:examId/end", adminEndExamController);
router.post("/exams/:examId/flag-student", adminFlagStudentController);
router.post("/exams/:examId/unlock-student", adminUnlockStudentController);
router.post("/exams/:examId/notify-student", adminNotifyStudentController);
router.post("/exams/:examId/announcement", adminSendAnnouncementController);
router.patch("/violations/:violationId/resolve", resolveViolationController);

// Assessment Analytics
router.get(
  "/academic/sections/:sectionId/subjects/:subjectId/assessments/analytics",
  getAssessmentAnalyticsController,
);

// Phase 4: Student & Profile Details
router.get("/students/:studentId/profile", getStudentProfileController);
router.get(
  "/academic/sections/:sectionId/subjects/:subjectId/details",
  getSectionSubjectDetailsController,
);

// Settings Routes
router.get("/settings", getSystemSettingsController);
router.patch("/settings", updateSystemSettingsController);
router.patch("/settings/security", updateSecurityPoliciesController);
router.patch("/settings/notifications", updateNotificationSettingsController);
router.patch("/password", changePasswordController);

// Login History Routes
router.get("/login-history", getLoginHistoryController);
router.get("/login-history/recent", getRecentLoginsController);

export default router;
