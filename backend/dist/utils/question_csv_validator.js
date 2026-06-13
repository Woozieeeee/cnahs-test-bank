"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuestionRow = void 0;
const difficulties = ["EASY", "MEDIUM", "HARD", "EXPERT"];
const validateQuestionRow = (row) => {
    const errors = [];
    if (!row.question?.trim()) {
        errors.push("Question is required");
    }
    if (!row.optionA?.trim()) {
        errors.push("Option A is required");
    }
    if (!row.optionB?.trim()) {
        errors.push("Option B is required");
    }
    if (!row.optionC?.trim()) {
        errors.push("Option C is required");
    }
    if (!row.optionD?.trim()) {
        errors.push("Option D is required");
    }
    const options = [row.optionA, row.optionB, row.optionC, row.optionD];
    if (!options.includes(row.correctAnswer?.trim())) {
        errors.push("Correct answer must match one of the options");
    }
    if (!difficulties.includes(row.difficulty?.toUpperCase())) {
        errors.push("Invalid difficulty");
    }
    return errors;
};
exports.validateQuestionRow = validateQuestionRow;
