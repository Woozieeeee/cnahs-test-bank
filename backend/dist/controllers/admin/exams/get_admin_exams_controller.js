"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminExamsController = void 0;
const get_admin_exams_service_1 = require("../../../services/admin/exams/get_admin_exams_service");
const getAdminExamsController = async (req, res) => {
    const filter = {
        status: req.query.status,
        subjectId: req.query.subjectId ? Number(req.query.subjectId) : undefined,
        search: req.query.search,
    };
    const exams = await (0, get_admin_exams_service_1.getAdminExamsService)(filter);
    return res.status(200).json(exams);
};
exports.getAdminExamsController = getAdminExamsController;
