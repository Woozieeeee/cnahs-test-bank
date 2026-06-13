"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTopicController = void 0;
const update_topic_service_1 = require("../../../services/faculty/topics/update_topic_service");
const updateTopicController = async (req, res) => {
    try {
        const topicId = Number(req.params.topicId);
        const facultyId = req.user.id;
        const topic = await (0, update_topic_service_1.updateTopicService)({
            facultyId,
            topicId,
            ...req.body,
        });
        return res.status(200).json(topic);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.updateTopicController = updateTopicController;
