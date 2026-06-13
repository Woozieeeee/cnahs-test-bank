"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_middleware_1 = __importDefault(require("../../middleware/upload_middleware"));
const upload_question_csv_controller_1 = require("../../controllers/faculty/questions/upload_question_csv_controller");
const download_question_template_controller_1 = require("../../controllers/faculty/questions/download_question_template_controller");
const get_import_history_controller_1 = require("../../controllers/faculty/questions/get_import_history_controller");
const get_import_job_details_controller_1 = require("../../controllers/faculty/questions/get_import_job_details_controller");
const router = (0, express_1.Router)();
router.post("/topics/:topicId/uploads", upload_middleware_1.default.single("file"), upload_question_csv_controller_1.uploadQuestionCsvController);
router.get("/topics/:topicId/template", download_question_template_controller_1.downloadQuestionTemplateController);
router.get("/history/:jobId", get_import_job_details_controller_1.getImportJobDetailsController);
router.get("/topics/:topicId/import-history", get_import_history_controller_1.getImportHistoryController);
exports.default = router;
