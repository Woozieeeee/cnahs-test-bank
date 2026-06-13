"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExamController = void 0;
const update_exam_service_1 = require("../../../services/faculty/exams/update_exam_service");
const updateExamController = async (req, res) => {
    const facultyId = req.user.id;
    const subjectId = Number(req.params.subjectId);
    const examId = Number(req.params.examId);
    const payload = req.body;
    try {
        const updatedExam = await (0, update_exam_service_1.updateExamService)({
            facultyId,
            subjectId,
            examId,
            payload,
        });
        res.status(200).json(updatedExam);
    }
    catch (error) {
        console.error("Error updating exam:", error);
        if (error.message.includes("not found")) {
            res.status(404).json({ message: error.message });
        }
        else if (error.message.includes("unauthorized")) {
            res.status(403).json({ message: error.message });
        }
        else if (error.message.includes("At least one question")) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};
exports.updateExamController = updateExamController;
