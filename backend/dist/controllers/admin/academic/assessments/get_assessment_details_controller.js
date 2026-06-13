"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssessmentDetailsController = void 0;
const get_assessment_details_service_1 = require("../../../../services/admin/academic/assessments/get_assessment_details_service");
const getAssessmentDetailsController = async (req, res) => {
    try {
        const assessmentId = Number(req.params.assessmentId);
        const assessment = await (0, get_assessment_details_service_1.getAssessmentDetailsService)(assessmentId);
        res.json(assessment);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch assessment details",
        });
    }
};
exports.getAssessmentDetailsController = getAssessmentDetailsController;
