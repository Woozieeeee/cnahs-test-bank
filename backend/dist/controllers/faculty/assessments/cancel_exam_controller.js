"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelExamController = void 0;
const cancel_exam_service_1 = require("../../../services/faculty/assessments/cancel_exam_service");
const cancelExamController = async (req, res) => {
    try {
        const facultyId = req.user?.id;
        if (!facultyId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const examId = Number(req.params.examId);
        const data = await (0, cancel_exam_service_1.cancelExamService)(examId);
        return res.json(data);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message || "Failed to cancel exam.",
        });
    }
};
exports.cancelExamController = cancelExamController;
