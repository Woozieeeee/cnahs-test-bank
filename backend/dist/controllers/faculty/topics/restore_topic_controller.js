"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreTopicController = void 0;
const restore_topic_service_1 = require("../../../services/faculty/topics/restore_topic_service");
const restoreTopicController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const topicId = Number(req.params.topicId);
        const topic = await (0, restore_topic_service_1.restoreTopicService)(facultyId, topicId);
        return res.status(200).json(topic);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.restoreTopicController = restoreTopicController;
