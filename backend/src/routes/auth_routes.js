import express from "express";
import { login } from "../controllers/login_controller";
import { register } from "../controllers/register_controller";
import { getMe } from "../controllers/me_controller";
import { authMiddleware } from "../middleware/auth_middleware";
const router = express.Router();
router.post("/login", login);
router.post("/register", register);
router.get("/me", authMiddleware, getMe);
router.get("/", (req, res) => {
    res.json({
        message: "Auth route working",
    });
});
export default router;
