"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveExamDraftController = void 0;
const save_exam_draft_service_1 = require("../../../services/faculty/exams/save_exam_draft_service");
const saveExamDraftController = async (req, res) => {
    const facultyId = req.user.id;
    const subjectId = Number(req.params.subjectId);
    const { currentStep, title, draftData } = req.body;
    const draft = await (0, save_exam_draft_service_1.saveExamDraftService)({
        facultyId,
        subjectId,
        currentStep,
        title,
        draftData,
    });
    res.status(200).json(draft);
};
exports.saveExamDraftController = saveExamDraftController;
