"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardController = void 0;
const get_dashboard_service_1 = require("../../../services/faculty/dashboard/get_dashboard_service");
const getDashboardController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const dashboard = await (0, get_dashboard_service_1.getDashboardService)(facultyId);
        return res.status(200).json(dashboard);
    }
    catch (error) {
        console.error("FACULTY DASHBOARD ERROR:", error);
        return res.status(500).json({
            message: "Failed to load faculty dashboard",
        });
    }
};
exports.getDashboardController = getDashboardController;
