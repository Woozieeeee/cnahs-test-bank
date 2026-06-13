"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const archive_subject_controller_1 = require("../../controllers/admin/academic/subjects/archive_subject_controller");
const restore_subject_controller_1 = require("../../controllers/admin/academic/subjects/restore_subject_controller");
const router = express_1.default.Router();
router.patch("/subjects/:id/archive", archive_subject_controller_1.archiveSubject);
router.patch("/subjects/:id/restore", restore_subject_controller_1.restoreSubject);
