"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectQuestionStatsController = void 0;
const get_subject_question_stats_service_1 = require("../../../../services/admin/academic/questions/get_subject_question_stats_service");
const getSubjectQuestionStatsController = async (req, res) => {
    try {
        const subjectId = Number(req.params.id);
        const stats = await (0, get_subject_question_stats_service_1.getSubjectQuestionStatsService)(subjectId);
        return res.status(200).json(stats);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to fetch question statistics",
        });
    }
};
exports.getSubjectQuestionStatsController = getSubjectQuestionStatsController;
