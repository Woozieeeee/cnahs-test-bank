import express from "express";

import questionImportRoutes from "./faculty/question_import_routes";
import { authMiddleware } from "../middleware/auth_middleware";
import { authorizeRoles } from "../middleware/role_middleware";
import { getDashboardController } from "../controllers/faculty/dashboard/get_dashboard_controller";
import { getSubjectsController } from "../controllers/faculty/subjects/get_subjects_controller";
import { getSubjectByIdController } from "../controllers/faculty/subjects/get_subjects_by_id_controller";
import { getTopicsController } from "../controllers/faculty/topics/get_topics_controller";
import { createTopicController } from "../controllers/faculty/topics/create_topic_controller";
import { updateTopicController } from "../controllers/faculty/topics/update_topic_controller";
import { archiveTopicController } from "../controllers/faculty/topics/archive_topic_controller";
import { restoreTopicController } from "../controllers/faculty/topics/restore_topic_controller";
import { archiveQuestionController } from "../controllers/faculty/questions/archive_question_controller";
import { restoreQuestionController } from "../controllers/faculty/questions/restore_question_controller";
import { getTopicQuestionsController } from "../controllers/faculty/questions/get_topic_questions_controller";
import { createQuestionController } from "../controllers/faculty/questions/create_question_controller";
import { updateQuestionController } from "../controllers/faculty/questions/update_question_controller";
import { getSubjectQuestionBankController } from "../controllers/faculty/questions/get_subject_question_bank_controller";
import { getSubjectAssessmentsController } from "../controllers/faculty/assessments/get_subject_assessments_controller";
import { getFacultyAssessmentDetails } from "../controllers/faculty/assessments/get_assessment_details_controller";
import { archiveExamController } from "../controllers/faculty/assessments/archive_exam_controller";
import { restoreExamController } from "../controllers/faculty/assessments/restore_exam_controller";
import { cancelExamController } from "../controllers/faculty/assessments/cancel_exam_controller";
import { saveExamDraftController } from "../controllers/faculty/exams/save_exam_draft_controller";
import { getExamDraftController } from "../controllers/faculty/exams/get_exam_draft_controller";
import { deleteExamDraftController } from "../controllers/faculty/exams/delete_exam_draft_controller";
import { getFacultyExamsController } from "../controllers/faculty/exams/get_faculty_exams_controller";
import { getFacultySectionsController } from "../controllers/faculty/exams/get_faculty_sections_controller";
import { createExamController } from "../controllers/faculty/exams/create_exam_controller";
import { getExamBuilderQuestionsController } from "../controllers/faculty/exams/get_exam_builder_questions_controller";
import { getExamSectionsController } from "../controllers/faculty/exams/get_exam_sections_controller";
import { getFacultyActivityLogs } from "../controllers/faculty/activity/get_faculty_activity_log_controller";

const router = express.Router();

router.use(authMiddleware, authorizeRoles("FACULTY"));
router.use("/", questionImportRoutes);

router.get("/dashboard", getDashboardController);
router.get("/subjects", getSubjectsController);
router.get("/subjects/:subjectId", getSubjectByIdController);
router.get("/subjects/:subjectId/topics", getTopicsController);
router.post("/subjects/:subjectId/topics", createTopicController);
router.get(
  "/subjects/:subjectId/question-bank",
  getSubjectQuestionBankController,
);
router.get("/exams", getFacultyExamsController);
router.get("/exams/sections", getFacultySectionsController);
router.get("/subjects/:subjectId/exams/draft", getExamDraftController);
router.post("/subjects/:subjectId/exams/draft", saveExamDraftController);
router.delete("/subjects/:subjectId/exams/draft", deleteExamDraftController);
router.get("/subjects/:subjectId/assessments", getSubjectAssessmentsController);
router.get(
  "/subjects/:subjectId/assessments/:assessmentId",
  getFacultyAssessmentDetails,
);
router.put("/exams/:examId/archive", archiveExamController);
router.put("/exams/:examId/restore", restoreExamController);
router.put("/exams/:examId/cancel", cancelExamController);
router.post("/topics/:topicId/questions", createQuestionController);
router.put("/topics/:topicId", updateTopicController);
router.put("/topics/:topicId/archive", archiveTopicController);
router.put("/topics/:topicId/restore", restoreTopicController);
router.get("/topics/:topicId/questions", getTopicQuestionsController);
router.put("/questions/:questionId/archive", archiveQuestionController);
router.put("/questions/:questionId/restore", restoreQuestionController);
router.put("/questions/:questionId", updateQuestionController);
router.post("/subjects/:subjectId/exams", createExamController);
router.get(
  "/subjects/:subjectId/exams/questions",
  getExamBuilderQuestionsController,
);
router.get("/subjects/:subjectId/exams/sections", getExamSectionsController);
router.get("/activity-logs", getFacultyActivityLogs);

export default router;
