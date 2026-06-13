"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPendingStudents = void 0;
const get_pending_students_service_1 = require("../../../services/admin/approvals/get_pending_students_service");
const getPendingStudents = async (req, res) => {
    try {
        const students = await (0, get_pending_students_service_1.getPendingStudentsService)();
        return res.json(students);
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to fetch pending students.",
        });
    }
};
exports.getPendingStudents = getPendingStudents;
