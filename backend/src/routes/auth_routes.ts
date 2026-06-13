import express from "express";
import { login } from "../controllers/login_controller";
import { register } from "../controllers/register_controller";
import { getMe } from "../controllers/me_controller";
import { authMiddleware } from "../middleware/auth_middleware";
import { trackStatus } from "../controllers/status_controller";
import { authorizeRoles } from "../middleware/role_middleware";
import { AuthRequest } from "../middleware/auth_middleware";
import { logout } from "../controllers/logout_controller";
import {
  loginRateLimiter,
  passwordResetRateLimiter,
} from "../middleware/rate_limit_middleware";
import { requestPasswordResetController } from "../controllers/auth/request_password_reset_controller";
import { hashPassword } from "../controllers/dev/hash_password_controller";
import { changePasswordController } from "../controllers/auth/change_password_controller";
import { updateProfileController } from "../controllers/auth/update_profile_controller";
import {
  deleteAvatarController,
  uploadAvatarController,
} from "../controllers/auth/upload_avatar_controller";
import { getAvatarController } from "../controllers/auth/get_avatar_controller";
import avatarUpload from "../middleware/avatar_upload_middleware";

const router = express.Router();

router.post("/login", loginRateLimiter, login);
router.post(
  "/password-reset-request",
  passwordResetRateLimiter,
  requestPasswordResetController,
);
router.post("/register", register);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMe);

router.get("/", (req, res) => {
  res.json({
    message: "Auth route working",
  });
});

router.get("/status/:studentId", trackStatus);
router.post("/hash-password", hashPassword);
router.patch("/change-password", authMiddleware, changePasswordController);
router.patch("/profile", authMiddleware, updateProfileController);
router.get("/avatar", authMiddleware, getAvatarController);
router.post(
  "/avatar",
  authMiddleware,
  avatarUpload.single("avatar"),
  uploadAvatarController,
);
router.delete("/avatar", authMiddleware, deleteAvatarController);

export default router;
