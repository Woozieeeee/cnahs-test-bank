"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.archiveSubject = void 0;
const archive_subject_service_1 = require("../../../../services/admin/academic/subjects/archive_subject_service");
const archiveSubject = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await (0, archive_subject_service_1.archiveSubjectService)(id);
        return res.json({
            message: "Subject archived successfully",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.archiveSubject = archiveSubject;
