"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSectionQuestionBankStatsController = void 0;
const get_section_question_bank_stats_service_1 = require("../../../../services/admin/academic/sections/get_section_question_bank_stats_service");
const getSectionQuestionBankStatsController = async (req, res) => {
    try {
        const sectionId = Number(req.params.id);
        const stats = await (0, get_section_question_bank_stats_service_1.getSectionQuestionBankStatsService)(sectionId);
        res.json(stats);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch question bank statistics",
        });
    }
};
exports.getSectionQuestionBankStatsController = getSectionQuestionBankStatsController;
