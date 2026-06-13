"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboard = void 0;
const student_dashboard_service_1 = require("../../services/student/student_dashboard_service");
/**
 * GET /api/student/dashboard
 * Get student dashboard with all subjects, progress, and statistics
 */
const getDashboard = async (req, res) => {
    try {
        // Get student ID from the authenticated user
        const studentId = req.user?.id;
        if (!studentId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Student ID not found",
            });
        }
        // Fetch dashboard data
        const dashboardData = await (0, student_dashboard_service_1.getStudentDashboard)(studentId);
        return res.status(200).json({
            success: true,
            data: dashboardData,
        });
    }
    catch (error) {
        console.error("Error fetching student dashboard:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard data",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getDashboard = getDashboard;
