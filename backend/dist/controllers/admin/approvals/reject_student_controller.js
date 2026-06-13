"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectStudent = void 0;
const reject_student_service_1 = require("../../../services/admin/approvals/reject_student_service");
const log_activity_1 = require("../../../utils/log_activity");
const rejectStudent = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const adminName = req.user?.name;
        const student = await (0, reject_student_service_1.rejectStudentService)(id, adminName);
        let activityLogRecorded = true;
        try {
            await (0, log_activity_1.logActivity)({
                action: "Rejected student account",
                categories: ["USER_MANAGEMENT", "APPROVALS"],
                severity: "INFO",
                description: `Registration requirements were not met.`,
                performedBy: adminName || "Unknown Admin",
                targetUser: student.name,
            });
        }
        catch (error) {
            activityLogRecorded = false;
            console.error("Failed to record activity log (reject student):", error);
        }
        return res.json({
            message: "Student rejected successfully.",
            student,
            activityLogRecorded,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to reject student.",
        });
    }
};
exports.rejectStudent = rejectStudent;
