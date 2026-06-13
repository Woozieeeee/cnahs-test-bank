"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamSectionsController = void 0;
const get_exam_sections_service_1 = require("../../../services/faculty/exams/get_exam_sections_service");
const getExamSectionsController = async (req, res) => {
    const facultyId = req.user.id;
    const subjectId = Number(req.params.subjectId);
    const sections = await (0, get_exam_sections_service_1.getExamSectionsService)(facultyId, subjectId);
    res.status(200).json(sections);
};
exports.getExamSectionsController = getExamSectionsController;
