"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFacultyExamsController = void 0;
const get_faculty_exams_service_1 = require("../../../services/faculty/exams/get_faculty_exams_service");
const getFacultyExamsController = async (req, res) => {
    const facultyId = req.user.id;
    const exams = await (0, get_faculty_exams_service_1.getFacultyExamsService)(facultyId);
    return res.status(200).json(exams);
};
exports.getFacultyExamsController = getFacultyExamsController;
