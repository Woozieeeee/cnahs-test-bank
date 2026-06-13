"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectAssessmentSummaryController = void 0;
const get_subject_assessment_summary_service_1 = require("../../../../services/admin/academic/assessments/get_subject_assessment_summary_service");
const getSubjectAssessmentSummaryController = async (req, res) => {
    try {
        const subjectId = Number(req.params.id);
        const summary = await (0, get_subject_assessment_summary_service_1.getSubjectAssessmentSummaryService)(subjectId);
        res.json(summary);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch assessment summary",
        });
    }
};
exports.getSubjectAssessmentSummaryController = getSubjectAssessmentSummaryController;
