import express from "express";
import { archiveSubject } from "../../controllers/admin/academic/subjects/archive_subject_controller";
import { restoreSubject } from "../../controllers/admin/academic/subjects/restore_subject_controller";

const router = express.Router();

router.patch("/subjects/:id/archive", archiveSubject);
router.patch("/subjects/:id/restore", restoreSubject);
