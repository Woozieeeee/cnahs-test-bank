"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamForEditController = void 0;
const get_exam_for_edit_service_1 = require("../../../services/faculty/exams/get_exam_for_edit_service");
const getExamForEditController = async (req, res) => {
    const facultyId = req.user.id;
    const subjectId = Number(req.params.subjectId);
    const examId = Number(req.params.examId);
    try {
        const examData = await (0, get_exam_for_edit_service_1.getExamForEditService)(facultyId, subjectId, examId);
        res.status(200).json(examData);
    }
    catch (error) {
        console.error("Error fetching exam for edit:", error);
        if (error.message.includes("not found")) {
            res.status(404).json({ message: error.message });
        }
        else if (error.message.includes("unauthorized")) {
            res.status(403).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};
exports.getExamForEditController = getExamForEditController;
