"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unassignSection = void 0;
const unassign_section_service_1 = require("../../../../services/admin/academic/student_records/unassign_section_service");
const unassignSection = async (req, res) => {
    try {
        const studentRecordId = Number(req.params.id);
        const updatedRecord = await (0, unassign_section_service_1.unassignSectionService)(studentRecordId);
        return res.json(updatedRecord);
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to unassign section.",
        });
    }
};
exports.unassignSection = unassignSection;
