"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_controller_1 = require("../controllers/login_controller");
const register_controller_1 = require("../controllers/register_controller");
const me_controller_1 = require("../controllers/me_controller");
const auth_middleware_1 = require("../middleware/auth_middleware");
const status_controller_1 = require("../controllers/status_controller");
const logout_controller_1 = require("../controllers/logout_controller");
const rate_limit_middleware_1 = require("../middleware/rate_limit_middleware");
const request_password_reset_controller_1 = require("../controllers/auth/request_password_reset_controller");
const hash_password_controller_1 = require("../controllers/dev/hash_password_controller");
const change_password_controller_1 = require("../controllers/auth/change_password_controller");
const update_profile_controller_1 = require("../controllers/auth/update_profile_controller");
const upload_avatar_controller_1 = require("../controllers/auth/upload_avatar_controller");
const get_avatar_controller_1 = require("../controllers/auth/get_avatar_controller");
const avatar_upload_middleware_1 = __importDefault(require("../middleware/avatar_upload_middleware"));
const router = express_1.default.Router();
router.post("/login", rate_limit_middleware_1.loginRateLimiter, login_controller_1.login);
router.post("/password-reset-request", rate_limit_middleware_1.passwordResetRateLimiter, request_password_reset_controller_1.requestPasswordResetController);
router.post("/register", register_controller_1.register);
router.post("/logout", logout_controller_1.logout);
router.get("/me", auth_middleware_1.authMiddleware, me_controller_1.getMe);
router.get("/", (req, res) => {
    res.json({
        message: "Auth route working",
    });
});
router.get("/status/:studentId", status_controller_1.trackStatus);
router.post("/hash-password", hash_password_controller_1.hashPassword);
router.patch("/change-password", auth_middleware_1.authMiddleware, change_password_controller_1.changePasswordController);
router.patch("/profile", auth_middleware_1.authMiddleware, update_profile_controller_1.updateProfileController);
router.get("/avatar", auth_middleware_1.authMiddleware, get_avatar_controller_1.getAvatarController);
router.post("/avatar", auth_middleware_1.authMiddleware, avatar_upload_middleware_1.default.single("avatar"), upload_avatar_controller_1.uploadAvatarController);
router.delete("/avatar", auth_middleware_1.authMiddleware, upload_avatar_controller_1.deleteAvatarController);
exports.default = router;
