"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadQuestionTemplateController = void 0;
const downloadQuestionTemplateController = (req, res) => {
    const csv = [
        "question,optionA,optionB,optionC,optionD,correctAnswer,difficulty,explanation",
        '"What is HTML?","Programming Language","Markup Language","Database","Operating System","Markup Language","EASY","HTML is a markup language."',
        '"What is CSS?","Database","Styling Language","Backend Framework","Server","Styling Language","EASY","CSS is used for styling."',
    ].join("\n");
    res.setHeader("Content-Disposition", "attachment; filename=question_template.csv");
    res.setHeader("Content-Type", "text/csv");
    return res.send(csv);
};
exports.downloadQuestionTemplateController = downloadQuestionTemplateController;
