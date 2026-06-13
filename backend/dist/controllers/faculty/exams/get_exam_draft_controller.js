"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamDraftController = void 0;
const get_exam_draft_service_1 = require("../../../services/faculty/exams/get_exam_draft_service");
const getExamDraftController = async (req, res) => {
    const facultyId = req.user.id;
    const subjectId = Number(req.params.subjectId);
    const draft = await (0, get_exam_draft_service_1.getExamDraftService)(facultyId, subjectId);
    res.status(200).json(draft);
};
exports.getExamDraftController = getExamDraftController;
