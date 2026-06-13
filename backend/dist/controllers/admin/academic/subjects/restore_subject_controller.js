"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreSubject = void 0;
const restore_subject_service_1 = require("../../../../services/admin/academic/subjects/restore_subject_service");
const restoreSubject = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await (0, restore_subject_service_1.restoreSubjectService)(id);
        return res.json({
            message: "Subject restored successfully",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.restoreSubject = restoreSubject;
