"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectByIdController = void 0;
const get_subject_by_id_service_1 = require("../../../services/faculty/subjects/get_subject_by_id_service");
const getSubjectByIdController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const subjectId = Number(req.params.subjectId);
        const subject = await (0, get_subject_by_id_service_1.getSubjectByIdService)(facultyId, subjectId);
        return res.status(200).json(subject);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.getSubjectByIdController = getSubjectByIdController;
