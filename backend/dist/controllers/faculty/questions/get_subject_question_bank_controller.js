"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectQuestionBankController = void 0;
const get_subject_question_bank_service_1 = require("../../../services/faculty/questions/get_subject_question_bank_service");
const getSubjectQuestionBankController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const subjectId = Number(req.params.subjectId);
        const data = await (0, get_subject_question_bank_service_1.getSubjectQuestionBankService)(facultyId, subjectId);
        return res.json(data);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message || "Failed to load question bank.",
        });
    }
};
exports.getSubjectQuestionBankController = getSubjectQuestionBankController;
