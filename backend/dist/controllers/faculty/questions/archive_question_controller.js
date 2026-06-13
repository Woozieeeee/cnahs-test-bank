"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.archiveQuestionController = void 0;
const archive_question_service_1 = require("../../../services/faculty/questions/archive_question_service");
const archiveQuestionController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const questionId = Number(req.params.questionId);
        const question = await (0, archive_question_service_1.archiveQuestionService)(facultyId, questionId);
        return res.json({
            message: "Question archived successfully",
            question,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
            dependencies: error.dependencies,
        });
    }
};
exports.archiveQuestionController = archiveQuestionController;
