import express from "express";

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

const router = express.Router();

router.use(authMiddleware, authorizeRoles("FACULTY"));

router.get("/dashboard", getDashboardController);
router.get("/subjects", getSubjectsController);
router.get("/subjects/:subjectId", getSubjectByIdController);
router.get("/subjects/:subjectId/topics", getTopicsController);
router.post("/subjects/:subjectId/topics", createTopicController);
router.put("/topics/:topicId", updateTopicController);
router.put("/topics/:topicId/archive", archiveTopicController);
router.put("/topics/:topicId/restore", restoreTopicController);

export default router;
