"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.archiveSection = void 0;
const archive_section_service_1 = require("../../../../services/admin/academic/sections/archive_section_service");
const archiveSection = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await (0, archive_section_service_1.archiveSectionService)(id);
        return res.json({
            message: "Section archived successfully",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.archiveSection = archiveSection;
