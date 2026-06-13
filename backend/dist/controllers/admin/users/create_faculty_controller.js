"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFaculty = void 0;
const create_faculty_service_1 = require("../../../services/admin/users/create_faculty_service");
const log_activity_1 = require("../../../utils/log_activity");
const createFaculty = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        if (!name || !username || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        const faculty = await (0, create_faculty_service_1.createFacultyService)({
            name,
            username,
            password,
        });
        const adminName = req.user?.name;
        let activityLogRecorded = true;
        try {
            await (0, log_activity_1.logActivity)({
                action: "Created faculty account",
                categories: ["USER_MANAGEMENT"],
                severity: "INFO",
                description: `New faculty member added to the system.`,
                performedBy: adminName || "Unknown Admin",
                targetUser: faculty.name,
            });
        }
        catch (error) {
            activityLogRecorded = false;
            console.error("Failed to record activity log (create faculty):", error);
        }
        return res.status(201).json({
            message: "Faculty created successfully",
            faculty,
            activityLogRecorded,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || "Server Error",
        });
    }
};
exports.createFaculty = createFaculty;
