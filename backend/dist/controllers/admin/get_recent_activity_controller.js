"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentActivity = void 0;
const get_recent_activity_service_1 = require("../../services/admin/activity/get_recent_activity_service");
const getRecentActivity = async (req, res) => {
    try {
        const activities = await (0, get_recent_activity_service_1.getRecentActivityService)();
        return res.json(activities);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to fetch recent activity",
        });
    }
};
exports.getRecentActivity = getRecentActivity;
