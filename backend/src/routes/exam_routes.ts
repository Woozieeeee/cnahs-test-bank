import express from "express";

import { recordExamViolationController } from "../controllers/exam/record_exam_violation_controller";
import { authMiddleware } from "../middleware/auth_middleware";

const router = express.Router();

router.post("/violations", authMiddleware, recordExamViolationController);

export default router;
