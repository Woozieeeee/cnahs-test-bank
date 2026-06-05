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
import { saveExamDraftController } from "../controllers/faculty/exams/save_exam_draft_controller";
import { getExamDraftController } from "../controllers/faculty/exams/get_exam_draft_controller";
import { deleteExamDraftController } from "../controllers/faculty/exams/delete_exam_draft_controller";
import { getFacultyExamsController } from "../controllers/faculty/exams/get_faculty_exams_controller";

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
router.get("/subjects/:subjectId/exams/draft", getExamDraftController);
router.post("/subjects/:subjectId/exams/draft", saveExamDraftController);
router.delete("/subjects/:subjectId/exams/draft", deleteExamDraftController);
router.get("/subjects/:subjectId/assessments", getSubjectAssessmentsController);
router.post("/topics/:topicId/questions", createQuestionController);
router.put("/topics/:topicId", updateTopicController);
router.put("/topics/:topicId/archive", archiveTopicController);
router.put("/topics/:topicId/restore", restoreTopicController);
router.get("/topics/:topicId/questions", getTopicQuestionsController);
router.put("/questions/:questionId/archive", archiveQuestionController);
router.put("/questions/:questionId/restore", restoreQuestionController);
router.put("/questions/:questionId", updateQuestionController);

export default router;
