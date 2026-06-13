"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreSection = void 0;
const restore_section_service_1 = require("../../../../services/admin/academic/sections/restore_section_service");
const restoreSection = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await (0, restore_section_service_1.restoreSectionService)(id);
        return res.json({
            message: "Section restored successfully",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.restoreSection = restoreSection;
