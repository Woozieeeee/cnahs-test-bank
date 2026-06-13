"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFacultyAssessmentDetails = void 0;
const get_assessment_details_service_1 = require("../../../services/faculty/assessments/get_assessment_details_service");
const getFacultyAssessmentDetails = async (req, res) => {
    try {
        const facultyId = req.user?.id;
        if (!facultyId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const subjectId = Number(req.params.subjectId);
        const assessmentId = Number(req.params.assessmentId);
        const data = await (0, get_assessment_details_service_1.getFacultyAssessmentDetailsService)(facultyId, subjectId, assessmentId);
        return res.json(data);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message || "Failed to load assessment details.",
        });
    }
};
exports.getFacultyAssessmentDetails = getFacultyAssessmentDetails;
