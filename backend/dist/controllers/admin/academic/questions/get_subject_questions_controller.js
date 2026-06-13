"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectQuestionsController = void 0;
const get_subject_questions_service_1 = require("../../../../services/admin/academic/questions/get_subject_questions_service");
const getSubjectQuestionsController = async (req, res) => {
    try {
        const subjectId = Number(req.params.id);
        const questions = await (0, get_subject_questions_service_1.getSubjectQuestionsService)(subjectId);
        return res.status(200).json(questions);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to fetch questions",
        });
    }
};
exports.getSubjectQuestionsController = getSubjectQuestionsController;
