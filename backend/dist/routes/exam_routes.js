"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const record_exam_violation_controller_1 = require("../controllers/exam/record_exam_violation_controller");
const auth_middleware_1 = require("../middleware/auth_middleware");
const router = express_1.default.Router();
router.post("/violations", auth_middleware_1.authMiddleware, record_exam_violation_controller_1.recordExamViolationController);
exports.default = router;
