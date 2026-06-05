import { Router } from "express";

import upload from "../../middleware/upload_middleware";

import { uploadQuestionCsvController } from "../../controllers/faculty/questions/upload_question_csv_controller";
import { downloadQuestionTemplateController } from "../../controllers/faculty/questions/download_question_template_controller";
import { getImportHistoryController } from "../../controllers/faculty/questions/get_import_history_controller";
import { getImportJobDetailsController } from "../../controllers/faculty/questions/get_import_job_details_controller";

const router = Router();

router.post(
  "/topics/:topicId/uploads",
  upload.single("file"),
  uploadQuestionCsvController,
);

router.get("/topics/:topicId/template", downloadQuestionTemplateController);
router.get("/history/:jobId", getImportJobDetailsController);
router.get("/topics/:topicId/import-history", getImportHistoryController);

export default router;
