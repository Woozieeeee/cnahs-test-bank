"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectByIdController = void 0;
const get_subject_by_id_service_1 = require("../../../../services/admin/academic/subjects/get_subject_by_id_service");
const getSubjectByIdController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const subject = await (0, get_subject_by_id_service_1.getSubjectByIdService)(id);
        if (!subject) {
            return res.status(404).json({
                message: "Subject not found",
            });
        }
        return res.status(200).json(subject);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to fetch subject",
        });
    }
};
exports.getSubjectByIdController = getSubjectByIdController;
