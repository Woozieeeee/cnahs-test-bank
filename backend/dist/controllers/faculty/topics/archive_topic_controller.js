"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.archiveTopicController = void 0;
const archive_topic_service_1 = require("../../../services/faculty/topics/archive_topic_service");
const archiveTopicController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const topicId = Number(req.params.topicId);
        const topic = await (0, archive_topic_service_1.archiveTopicService)(facultyId, topicId);
        return res.status(200).json(topic);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
            dependencies: error.dependencies || null,
        });
    }
};
exports.archiveTopicController = archiveTopicController;
