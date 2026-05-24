import express from "express";
import { login } from "../controllers/login_controller";
import { register } from "../controllers/register_controller";
import { getMe } from "../controllers/me_controller";
import { authMiddleware } from "../middleware/auth_middleware";
import { trackStatus } from "../controllers/status_controller";
import { authorizeRoles } from "../middleware/role_middleware";
import { AuthRequest } from "../middleware/auth_middleware";
import { logout } from "../controllers/logout_controller";
import { loginRateLimiter } from "../middleware/rate_limit_middleware";

const router = express.Router();

router.post("/login", loginRateLimiter, login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMe);

router.get("/", (req, res) => {
  res.json({
    message: "Auth route working",
  });
});

router.get("/status/:studentId", trackStatus);

export default router;
