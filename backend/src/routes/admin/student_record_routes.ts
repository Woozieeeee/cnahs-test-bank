import { Router } from "express";

import multer from "multer";

import { uploadStudentRecords } from "../../controllers/admin/student_records/upload_student_records_controller";

const router = Router();

const upload = multer({
  dest: "uploads/",
});

// =========================
// UPLOAD STUDENT RECORDS
// =========================

router.post(
  "/upload",

  upload.single("file"),

  uploadStudentRecords,
);

export default router;
