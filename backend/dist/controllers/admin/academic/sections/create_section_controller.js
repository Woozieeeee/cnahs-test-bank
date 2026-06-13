"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSection = void 0;
const create_section_service_1 = require("../../../../services/admin/academic/sections/create_section_service");
const createSection = async (req, res) => {
    try {
        const { sectionCode, yearLevel, program } = req.body ?? {};
        if (!sectionCode || !yearLevel || !program) {
            return res.status(400).json({
                message: "sectionCode, yearLevel, and program are required.",
            });
        }
        const section = await (0, create_section_service_1.createSectionService)({
            sectionCode,
            yearLevel: Number(yearLevel),
            program,
        });
        return res.status(201).json(section);
    }
    catch (error) {
        return res.status(400).json({
            message: error?.message || "Failed to create section.",
        });
    }
};
exports.createSection = createSection;
