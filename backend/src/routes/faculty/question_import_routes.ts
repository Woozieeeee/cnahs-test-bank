import { Router } from "express";

import upload from "../../middleware/upload_middleware";

import { uploadQuestionCsvController } from "../../controllers/faculty/questions/upload_question_csv_controller";
import { downloadQuestionTemplateController } from "../../controllers/faculty/questions/download_question_template_controller";
import { getImportHistoryController } from "../../controllers/faculty/questions/get_import_history_controller";

const router = Router();

router.post(
  "/topics/:topicId/upload",
  upload.single("file"),
  uploadQuestionCsvController,
);

router.get("/topics/:topicId/template", downloadQuestionTemplateController);

router.get("/topics/:topicId/import-history", getImportHistoryController);

export default router;
