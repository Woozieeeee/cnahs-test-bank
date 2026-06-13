"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamBuilderQuestionsController = void 0;
const get_exam_builder_questions_service_1 = require("../../../services/faculty/exams/get_exam_builder_questions_service");
const getExamBuilderQuestionsController = async (req, res) => {
    const subjectId = Number(req.params.subjectId);
    const difficulty = String(req.query.difficulty);
    const questions = await (0, get_exam_builder_questions_service_1.getExamBuilderQuestionsService)(subjectId, difficulty);
    res.status(200).json(questions);
};
exports.getExamBuilderQuestionsController = getExamBuilderQuestionsController;
