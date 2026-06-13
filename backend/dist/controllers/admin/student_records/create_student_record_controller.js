"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudentRecord = void 0;
const create_student_record_service_1 = require("../../../services/admin/student_records/create_student_record_service");
const createStudentRecord = async (req, res) => {
    try {
        const { studentId, firstName, middleName, lastName, suffix, program, } = req.body;
        const record = await (0, create_student_record_service_1.createStudentRecordService)({
            studentId,
            firstName,
            middleName,
            lastName,
            suffix,
            program,
        });
        return res.status(201).json(record);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message || "Failed to create student record",
        });
    }
};
exports.createStudentRecord = createStudentRecord;
