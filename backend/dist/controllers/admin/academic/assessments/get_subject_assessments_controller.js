"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectAssessmentsController = void 0;
const get_subject_assessments_service_1 = require("../../../../services/admin/academic/assessments/get_subject_assessments_service");
const getSubjectAssessmentsController = async (req, res) => {
    try {
        const subjectId = Number(req.params.id);
        const assessments = await (0, get_subject_assessments_service_1.getSubjectAssessmentsService)(subjectId);
        res.json(assessments);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch assessments",
        });
    }
};
exports.getSubjectAssessmentsController = getSubjectAssessmentsController;
