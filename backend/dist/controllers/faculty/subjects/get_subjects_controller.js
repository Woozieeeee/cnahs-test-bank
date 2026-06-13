"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectsController = void 0;
const get_subjects_service_1 = require("../../../services/faculty/subjects/get_subjects_service");
const getSubjectsController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const subjects = await (0, get_subjects_service_1.getSubjectsService)(facultyId);
        return res.status(200).json(subjects);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to load subjects",
        });
    }
};
exports.getSubjectsController = getSubjectsController;
