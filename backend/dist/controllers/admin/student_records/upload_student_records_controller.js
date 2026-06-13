"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadStudentRecords = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const upload_student_records_service_1 = require("../../../services/admin/student_records/upload_student_records_service");
const uploadStudentRecords = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "CSV file is required",
            });
        }
        const results = [];
        fs_1.default.createReadStream(req.file.path)
            .pipe((0, csv_parser_1.default)())
            .on("data", (data) => {
            results.push({
                studentId: data.studentId,
                fullName: data.fullName,
                program: data.program,
            });
        })
            .on("end", async () => {
            const summary = await (0, upload_student_records_service_1.uploadStudentRecordsService)(results);
            return res.json({
                message: "Student records uploaded successfully",
                ...summary,
            });
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to upload records",
        });
    }
};
exports.uploadStudentRecords = uploadStudentRecords;
