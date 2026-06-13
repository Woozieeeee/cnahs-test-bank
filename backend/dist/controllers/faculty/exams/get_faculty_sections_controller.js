"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFacultySectionsController = void 0;
const get_faculty_sections_service_1 = require("../../../services/faculty/exams/get_faculty_sections_service");
const getFacultySectionsController = async (req, res) => {
    const facultyId = req.user.id;
    const sections = await (0, get_faculty_sections_service_1.getFacultySectionsService)(facultyId);
    return res.status(200).json(sections);
};
exports.getFacultySectionsController = getFacultySectionsController;
