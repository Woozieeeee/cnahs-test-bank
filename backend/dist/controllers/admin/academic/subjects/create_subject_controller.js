"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubject = void 0;
const create_subject_service_1 = require("../../../../services/admin/academic/subjects/create_subject_service");
const createSubject = async (req, res) => {
    try {
        const { name, code, description } = req.body;
        const subject = await (0, create_subject_service_1.createSubjectService)({
            name,
            code,
            description,
        });
        return res.status(201).json(subject);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.createSubject = createSubject;
