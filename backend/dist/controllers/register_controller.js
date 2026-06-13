"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const register_service_1 = require("../services/auth/register_service");
const register = async (req, res) => {
    try {
        const { studentId, password } = req.body;
        const user = await (0, register_service_1.registerService)({
            studentId,
            password,
        });
        return res.status(201).json({
            message: "Registration successful",
            user,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.register = register;
