"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreExamController = void 0;
const restore_exam_service_1 = require("../../../services/faculty/assessments/restore_exam_service");
const restoreExamController = async (req, res) => {
    try {
        const facultyId = req.user?.id;
        if (!facultyId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const examId = Number(req.params.examId);
        const data = await (0, restore_exam_service_1.restoreExamService)(examId);
        return res.json(data);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message || "Failed to restore exam.",
        });
    }
};
exports.restoreExamController = restoreExamController;
