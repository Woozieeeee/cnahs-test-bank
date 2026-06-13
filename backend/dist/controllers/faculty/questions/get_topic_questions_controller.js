"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopicQuestionsController = void 0;
const get_topic_questions_service_1 = require("../../../services/faculty/questions/get_topic_questions_service");
const getTopicQuestionsController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const topicId = Number(req.params.topicId);
        const questions = await (0, get_topic_questions_service_1.getTopicQuestionsService)(facultyId, topicId);
        return res.json(questions);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.getTopicQuestionsController = getTopicQuestionsController;
