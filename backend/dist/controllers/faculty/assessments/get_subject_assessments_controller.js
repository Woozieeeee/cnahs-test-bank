"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectAssessmentsController = void 0;
const get_subject_assessments_service_1 = require("../../../services/faculty/assessments/get_subject_assessments_service");
const getSubjectAssessmentsController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const subjectId = Number(req.params.subjectId);
        const data = await (0, get_subject_assessments_service_1.getSubjectAssessmentsService)(facultyId, subjectId);
        return res.json(data);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message || "Failed to load assessments.",
        });
    }
};
exports.getSubjectAssessmentsController = getSubjectAssessmentsController;
