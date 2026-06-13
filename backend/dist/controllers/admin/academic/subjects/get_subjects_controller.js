"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjects = void 0;
const get_subject_service_1 = require("../../../../services/admin/academic/subjects/get_subject_service");
const getSubjects = async (req, res) => {
    try {
        const tab = req.query.tab || "ALL";
        const subjects = await (0, get_subject_service_1.getSubjectsService)(tab);
        return res.json(subjects);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
exports.getSubjects = getSubjects;
