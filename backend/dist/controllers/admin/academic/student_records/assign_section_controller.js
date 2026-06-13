"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignSection = void 0;
const assign_section_service_1 = require("../../../../services/admin/academic/student_records/assign_section_service");
const assignSection = async (req, res) => {
    try {
        const studentRecordId = Number(req.params.id);
        const { sectionId } = req.body;
        const updatedRecord = await (0, assign_section_service_1.assignSectionService)({
            studentRecordId,
            sectionId,
        });
        return res.json(updatedRecord);
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to assign section.",
        });
    }
};
exports.assignSection = assignSection;
