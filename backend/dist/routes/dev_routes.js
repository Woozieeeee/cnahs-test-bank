"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hash_password_controller_1 = require("../controllers/dev/hash_password_controller");
const router = express_1.default.Router();
router.post("/hash-password", hash_password_controller_1.hashPassword);
exports.default = router;
