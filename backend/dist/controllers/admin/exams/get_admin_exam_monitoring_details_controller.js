"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminExamMonitoringDetailsController = void 0;
const get_admin_exam_monitoring_details_service_1 = require("../../../services/admin/exams/get_admin_exam_monitoring_details_service");
const getAdminExamMonitoringDetailsController = async (req, res) => {
    try {
        const examId = parseInt(req.params.examId);
        if (isNaN(examId)) {
            return res.status(400).json({ message: "Invalid exam ID" });
        }
        // Cache for 5 seconds for real-time monitoring
        res.set({
            'Cache-Control': 'private, max-age=5',
            'Expires': new Date(Date.now() + 5000).toUTCString(),
        });
        const startTime = Date.now();
        const data = await (0, get_admin_exam_monitoring_details_service_1.getAdminExamMonitoringDetailsService)(examId);
        const queryTime = Date.now() - startTime;
        if (queryTime > 1000) {
            console.warn(`⚠️  Slow admin exam monitoring query: ${queryTime}ms for exam ${examId}`);
        }
        else {
            console.log(`✓ Admin exam monitoring query: ${queryTime}ms for exam ${examId}`);
        }
        return res.status(200).json(data);
    }
    catch (error) {
        console.error("Failed to fetch admin exam monitoring details:", error);
        if (error.message.includes("not found")) {
            return res.status(404).json({ message: "Exam not found" });
        }
        return res.status(500).json({
            message: "Failed to fetch exam monitoring details",
            error: error.message,
        });
    }
};
exports.getAdminExamMonitoringDetailsController = getAdminExamMonitoringDetailsController;
