"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveStudent = void 0;
const approve_student_service_1 = require("../../../services/admin/approvals/approve_student_service");
const log_activity_1 = require("../../../utils/log_activity");
const approveStudent = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const adminName = req.user?.name;
        const student = await (0, approve_student_service_1.approveStudentService)(id, adminName);
        let activityLogRecorded = true;
        try {
            await (0, log_activity_1.logActivity)({
                action: "Approved student account",
                categories: ["USER_MANAGEMENT", "APPROVALS"],
                severity: "INFO",
                description: `Registration verified and access granted.`,
                performedBy: adminName || "Unknown Admin",
                targetUser: student.name,
            });
        }
        catch (error) {
            activityLogRecorded = false;
            console.error("Failed to record activity log (approve student):", error);
        }
        return res.json({
            message: "Student approved successfully.",
            student,
            activityLogRecorded,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to approve student.",
        });
    }
};
exports.approveStudent = approveStudent;
