"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivityLogs = void 0;
const get_activity_logs_service_1 = require("../../../services/admin/activity/get_activity_logs_service");
const getActivityLogs = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = String(req.query.search || "");
        const category = String(req.query.category || "ALL");
        const severity = String(req.query.severity || "ALL");
        const result = await (0, get_activity_logs_service_1.getActivityLogsService)({
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
exports.getActivityLogs = getActivityLogs;
