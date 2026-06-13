"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopicsController = void 0;
const get_topics_service_1 = require("../../../services/faculty/topics/get_topics_service");
const getTopicsController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const subjectId = Number(req.params.subjectId);
        const topics = await (0, get_topics_service_1.getTopicsService)(facultyId, subjectId);
        return res.status(200).json(topics);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.getTopicsController = getTopicsController;
