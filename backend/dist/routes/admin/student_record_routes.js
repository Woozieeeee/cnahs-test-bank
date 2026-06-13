"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload_student_records_controller_1 = require("../../controllers/admin/student_records/upload_student_records_controller");
const create_student_record_controller_1 = require("../../controllers/admin/student_records/create_student_record_controller");
const update_student_record_controller_1 = require("../../controllers/admin/student_records/update_student_record_controller");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    dest: "uploads/",
});
// =========================
// UPLOAD STUDENT RECORDS
// =========================
router.post("/upload", upload.single("file"), upload_student_records_controller_1.uploadStudentRecords);
// =========================
// CREATE STUDENT RECORDS
// =========================
router.post("/", create_student_record_controller_1.createStudentRecord);
// =========================
// UPDATE STUDENT RECORDS
// =========================
router.patch("/:id", update_student_record_controller_1.updateStudentRecord);
exports.default = router;
