import { Router } from "express";
import multer from "multer";
import { uploadStudentRecords } from "../../controllers/admin/student_records/upload_student_records_controller";
import { createStudentRecord } from "../../controllers/admin/student_records/create_student_record_controller";
import { updateStudentRecord } from "../../controllers/admin/student_records/update_student_record_controller";

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

// =========================
// CREATE STUDENT RECORDS
// =========================

router.post("/", createStudentRecord);

// =========================
// UPDATE STUDENT RECORDS
// =========================

router.patch(
  "/:id",

  updateStudentRecord,
);

export default router;
