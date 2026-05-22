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
const router = express_1.default.Router();
router.post("/login", login_controller_1.login);
router.post("/register", register_controller_1.register);
router.get("/me", auth_middleware_1.authMiddleware, me_controller_1.getMe);
router.get("/", (req, res) => {
    res.json({
        message: "Auth route working",
    });
});
exports.default = router;
