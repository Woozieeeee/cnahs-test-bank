"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreQuestionController = void 0;
const restore_question_service_1 = require("../../../services/faculty/questions/restore_question_service");
const restoreQuestionController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const questionId = Number(req.params.questionId);
        const question = await (0, restore_question_service_1.restoreQuestionService)(facultyId, questionId);
        return res.json({
            message: "Question restored successfully",
            question,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.restoreQuestionController = restoreQuestionController;
