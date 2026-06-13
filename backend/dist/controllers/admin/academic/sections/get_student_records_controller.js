"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentRecords = void 0;
const get_student_records_service_1 = require("../../../../services/admin/academic/sections/get_student_records_service");
const getStudentRecords = async (req, res) => {
    try {
        const records = await (0, get_student_records_service_1.getStudentRecordsService)();
        return res.json(records);
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to fetch student records.",
        });
    }
};
exports.getStudentRecords = getStudentRecords;
