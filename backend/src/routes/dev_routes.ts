import express from "express";

import { hashPassword } from "../controllers/dev/hash_password_controller";

const router = express.Router();

router.post("/hash-password", hashPassword);

export default router;
