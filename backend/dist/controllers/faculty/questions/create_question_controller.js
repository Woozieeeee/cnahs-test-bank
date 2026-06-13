"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuestionController = void 0;
const create_question_service_1 = require("../../../services/faculty/questions/create_question_service");
const createQuestionController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const topicId = Number(req.params.topicId);
        const question = await (0, create_question_service_1.createQuestionService)({
            facultyId,
            topicId,
            ...req.body,
        });
        return res.status(201).json(question);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message || "Failed to create question",
        });
    }
};
exports.createQuestionController = createQuestionController;
