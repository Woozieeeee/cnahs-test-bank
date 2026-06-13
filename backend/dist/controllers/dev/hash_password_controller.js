"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        return res.json({
            hashedPassword,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
exports.hashPassword = hashPassword;
