"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSections = void 0;
const get_sections_service_1 = require("../../../../services/admin/academic/sections/get_sections_service");
const getSections = async (req, res) => {
    try {
        const sections = await (0, get_sections_service_1.getSectionsService)();
        return res.json(sections);
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to fetch sections.",
        });
    }
};
exports.getSections = getSections;
