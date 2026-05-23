import express from "express";

import {
  getPendingStudents,
  approveStudent,
  rejectStudent,
} from "../controllers/admin_controller";

const router = express.Router();

router.get("/pending-students", getPendingStudents);

router.patch("/approve/:id", approveStudent);

router.patch("/reject/:id", rejectStudent);

export default router;
