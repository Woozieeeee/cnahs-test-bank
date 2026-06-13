"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignSubjectSections = void 0;
const assign_subject_section_service_1 = require("../../../../services/admin/academic/subjects/assign_subject_section_service");
const assignSubjectSections = async (req, res) => {
    try {
        const subjectId = Number(req.params.id);
        const { sectionIds } = req.body;
        await (0, assign_subject_section_service_1.assignSubjectSectionsService)(subjectId, sectionIds);
        return res.json({
            message: "Sections assigned successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
exports.assignSubjectSections = assignSubjectSections;
