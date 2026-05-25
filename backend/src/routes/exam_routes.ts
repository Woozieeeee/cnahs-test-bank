import express from "express";

import { recordExamViolationController } from "../controllers/exam/record_exam_violation_controller";

const router = express.Router();

router.post("/violations", recordExamViolationController);

export default router;
