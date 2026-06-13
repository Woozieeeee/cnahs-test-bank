"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadQuestionCsvController = void 0;
const fs_1 = __importDefault(require("fs"));
const promises_1 = __importDefault(require("fs/promises"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const upload_question_csv_service_1 = require("../../../services/faculty/questions/upload_question_csv_service");
const uploadQuestionCsvController = async (req, res) => {
    const topicId = Number(req.params.topicId);
    const facultyId = req.user.id;
    if (!req.file) {
        return res.status(400).json({
            message: "CSV file is required.",
        });
    }
    const file = req.file;
    try {
        if (!file.originalname.toLowerCase().endsWith(".csv")) {
            await promises_1.default.unlink(file.path).catch(() => { });
            return res.status(400).json({
                message: "Only CSV files are allowed.",
            });
        }
        const rows = [];
        let headerValidated = false;
        const requiredColumns = [
            "question",
            "optionA",
            "optionB",
            "optionC",
            "optionD",
            "correctAnswer",
            "difficulty",
        ];
        fs_1.default.createReadStream(file.path)
            .pipe((0, csv_parser_1.default)())
            .on("data", (data) => {
            if (!headerValidated) {
                const columns = Object.keys(data);
                const missingColumns = requiredColumns.filter((column) => !columns.includes(column));
                if (missingColumns.length > 0) {
                    throw new Error(`Missing columns: ${missingColumns.join(", ")}`);
                }
                headerValidated = true;
            }
            rows.push({
                question: data.question,
                optionA: data.optionA,
                optionB: data.optionB,
                optionC: data.optionC,
                optionD: data.optionD,
                correctAnswer: data.correctAnswer,
                difficulty: data.difficulty,
                explanation: data.explanation,
            });
        })
            .on("end", async () => {
            try {
                const summary = await (0, upload_question_csv_service_1.uploadQuestionCsvService)({
                    facultyId,
                    topicId,
                    file,
                    rows,
                });
                return res.json({
                    message: "Questions uploaded successfully.",
                    ...summary,
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: error.message || "Failed to process CSV.",
                });
            }
            finally {
                await promises_1.default.unlink(file.path).catch(() => { });
            }
        })
            .on("error", async () => {
            await promises_1.default.unlink(file.path).catch(() => { });
            return res.status(400).json({
                message: "Invalid CSV file.",
            });
        });
    }
    catch (error) {
        await promises_1.default.unlink(file.path).catch(() => { });
        return res.status(500).json({
            message: error.message || "Failed to upload questions.",
        });
    }
};
exports.uploadQuestionCsvController = uploadQuestionCsvController;
