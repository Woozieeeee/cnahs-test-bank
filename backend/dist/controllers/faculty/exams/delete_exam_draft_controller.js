"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExamDraftController = void 0;
const delete_exam_draft_service_1 = require("../../../services/faculty/exams/delete_exam_draft_service");
const deleteExamDraftController = async (req, res) => {
    const facultyId = req.user.id;
    const subjectId = Number(req.params.subjectId);
    await (0, delete_exam_draft_service_1.deleteExamDraftService)(facultyId, subjectId);
    res.status(200).json({
        message: "Draft deleted successfully.",
    });
};
exports.deleteExamDraftController = deleteExamDraftController;
