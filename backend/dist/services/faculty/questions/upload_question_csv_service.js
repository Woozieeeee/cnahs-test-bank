"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadQuestionCsvService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const client_1 = require("@prisma/client");
const uploadQuestionCsvService = async ({ facultyId, topicId, file, rows, }) => {
    const topic = await prisma_1.default.topic.findFirst({
        where: {
            id: topicId,
            subject: {
                faculties: {
                    some: {
                        facultyId,
                    },
                },
            },
        },
        include: {
            subject: true,
        },
    });
    if (!topic) {
        throw new Error("Topic not found");
    }
    const importJob = await prisma_1.default.importJob.create({
        data: {
            filename: file.originalname,
            filePath: file.path,
            fileSize: file.size,
            mimeType: file.mimetype,
            createdById: facultyId,
            topicId,
        },
    });
    const batch = await prisma_1.default.questionImportBatch.create({
        data: {
            filename: file.originalname,
            totalRows: rows.length,
            importedRows: 0,
            skippedRows: 0,
            importJobId: importJob.id,
        },
    });
    let importedRows = 0;
    let skippedRows = 0;
    const errors = [];
    const existingQuestions = await prisma_1.default.question.findMany({
        where: {
            topicId,
        },
        select: {
            question: true,
        },
    });
    const existingSet = new Set(existingQuestions.map((q) => q.question.trim().toLowerCase()));
    const allowedDifficulties = ["EASY", "MEDIUM", "HARD", "EXPERT"];
    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        try {
            const question = row.question?.trim();
            const optionA = row.optionA?.trim();
            const optionB = row.optionB?.trim();
            const optionC = row.optionC?.trim();
            const optionD = row.optionD?.trim();
            const correctAnswer = row.correctAnswer?.trim();
            const difficulty = row.difficulty?.toUpperCase();
            if (!question || question.length < 10) {
                skippedRows++;
                errors.push(`Row ${index + 2}: Question too short`);
                continue;
            }
            const options = [optionA, optionB, optionC, optionD];
            if (options.some((o) => !o)) {
                skippedRows++;
                errors.push(`Row ${index + 2}: Missing option`);
                continue;
            }
            const uniqueOptions = new Set(options);
            if (uniqueOptions.size !== 4) {
                skippedRows++;
                errors.push(`Row ${index + 2}: Duplicate options`);
                continue;
            }
            if (!correctAnswer) {
                skippedRows++;
                errors.push(`Row ${index + 2}: Missing correct answer`);
                continue;
            }
            if (!options.includes(correctAnswer)) {
                skippedRows++;
                errors.push(`Row ${index + 2}: Invalid correct answer`);
                continue;
            }
            if (!allowedDifficulties.includes(difficulty)) {
                skippedRows++;
                errors.push(`Row ${index + 2}: Invalid difficulty`);
                continue;
            }
            if (existingSet.has(question.toLowerCase())) {
                skippedRows++;
                errors.push(`Row ${index + 2}: Duplicate question`);
                continue;
            }
            await prisma_1.default.question.create({
                data: {
                    subjectId: topic.subjectId,
                    topicId,
                    question,
                    explanation: row.explanation?.trim() || null,
                    correctAnswer,
                    difficulty,
                    createdById: facultyId,
                    importBatchId: batch.id,
                    options: {
                        create: options.map((option) => ({
                            optionText: option,
                            isCorrect: option === correctAnswer,
                        })),
                    },
                },
            });
            existingSet.add(question.toLowerCase());
            importedRows++;
        }
        catch {
            skippedRows++;
            errors.push(`Row ${index + 2}: Failed to import`);
        }
    }
    await prisma_1.default.questionImportBatch.update({
        where: {
            id: batch.id,
        },
        data: {
            importedRows,
            skippedRows,
            completedAt: new Date(),
        },
    });
    await prisma_1.default.importJob.update({
        where: {
            id: importJob.id,
        },
        data: {
            totalRows: rows.length,
            importedRows,
            skippedRows,
            completedAt: new Date(),
            errorReport: errors.length > 0 ? errors : client_1.Prisma.JsonNull,
            status: importedRows > 0 ? "COMPLETED" : "FAILED",
        },
    });
    if (importedRows > 0) {
        await prisma_1.default.topic.update({
            where: {
                id: topicId,
            },
            data: {
                totalQuestions: {
                    increment: importedRows,
                },
            },
        });
        await prisma_1.default.subject.update({
            where: {
                id: topic.subjectId,
            },
            data: {
                totalQuestions: {
                    increment: importedRows,
                },
            },
        });
    }
    return {
        importedRows,
        skippedRows,
        errors,
    };
};
exports.uploadQuestionCsvService = uploadQuestionCsvService;
