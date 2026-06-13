"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubject = void 0;
const update_subject_service_1 = require("../../../../services/admin/academic/subjects/update_subject_service");
const updateSubject = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, code, description } = req.body;
        const subject = await (0, update_subject_service_1.updateSubjectService)({
            id,
            name,
            code,
            description,
        });
        return res.json(subject);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.updateSubject = updateSubject;
