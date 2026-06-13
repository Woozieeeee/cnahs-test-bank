"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.archiveExamController = void 0;
const archive_exam_service_1 = require("../../../services/faculty/assessments/archive_exam_service");
const archiveExamController = async (req, res) => {
    try {
        const facultyId = req.user?.id;
        if (!facultyId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const examId = Number(req.params.examId);
        const data = await (0, archive_exam_service_1.archiveExamService)(examId);
        return res.json(data);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message || "Failed to archive exam.",
        });
    }
};
exports.archiveExamController = archiveExamController;
