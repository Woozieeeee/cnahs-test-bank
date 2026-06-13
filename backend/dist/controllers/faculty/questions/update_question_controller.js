"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuestionController = void 0;
const update_question_service_1 = require("../../../services/faculty/questions/update_question_service");
const updateQuestionController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const questionId = Number(req.params.questionId);
        const { question, explanation, difficulty, correctAnswer, options } = req.body;
        const updatedQuestion = await (0, update_question_service_1.updateQuestionService)({
            facultyId,
            questionId,
            question,
            explanation,
            difficulty,
            correctAnswer,
            options,
        });
        return res.status(200).json(updatedQuestion);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message || "Failed to update question",
        });
    }
};
exports.updateQuestionController = updateQuestionController;
