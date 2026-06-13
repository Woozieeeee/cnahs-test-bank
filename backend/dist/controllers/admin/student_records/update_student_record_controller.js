"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentRecord = void 0;
const update_student_record_service_1 = require("../../../services/admin/student_records/update_student_record_service");
const updateStudentRecord = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { studentId, firstName, middleName, lastName, suffix, program, } = req.body;
        const updatedRecord = await (0, update_student_record_service_1.updateStudentRecordService)({
            id,
            studentId,
            firstName,
            middleName,
            lastName,
            suffix,
            program,
        });
        return res.json(updatedRecord);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message || "Failed to update student record.",
        });
    }
};
exports.updateStudentRecord = updateStudentRecord;
