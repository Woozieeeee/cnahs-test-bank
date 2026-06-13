"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSectionById = void 0;
const get_section_by_id_service_1 = require("../../../../services/admin/academic/sections/get_section_by_id_service");
const getSectionById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const section = await (0, get_section_by_id_service_1.getSectionByIdService)(id);
        return res.json(section);
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to fetch section.",
        });
    }
};
exports.getSectionById = getSectionById;
