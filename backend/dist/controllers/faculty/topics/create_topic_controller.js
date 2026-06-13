"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTopicController = void 0;
const create_topic_service_1 = require("../../../services/faculty/topics/create_topic_service");
const createTopicController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const subjectId = Number(req.params.subjectId);
        const topic = await (0, create_topic_service_1.createTopicService)({
            facultyId,
            subjectId,
            ...req.body,
        });
        return res.status(201).json(topic);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.createTopicController = createTopicController;
