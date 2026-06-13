"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSection = void 0;
const update_section_service_1 = require("../../../../services/admin/academic/sections/update_section_service");
const updateSection = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const section = await (0, update_section_service_1.updateSectionService)(id, req.body);
        return res.json(section);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.updateSection = updateSection;
