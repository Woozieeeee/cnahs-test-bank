"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFacultyActivityLogs = void 0;
const get_faculty_activity_logs_service_1 = require("../../../services/faculty/activity/get_faculty_activity_logs_service");
const getFacultyActivityLogs = async (req, res) => {
    try {
        const facultyId = req.user?.id;
        if (!facultyId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = String(req.query.search || "");
        const category = String(req.query.category || "ALL");
        const severity = String(req.query.severity || "ALL");
        const result = await (0, get_faculty_activity_logs_service_1.getFacultyActivityLogsService)({
            facultyId: Number(facultyId),
            page,
            limit,
            search,
            category,
            severity,
        });
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to fetch activity logs",
        });
    }
};
exports.getFacultyActivityLogs = getFacultyActivityLogs;
