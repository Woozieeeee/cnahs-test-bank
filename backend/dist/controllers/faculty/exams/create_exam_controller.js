"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExamController = void 0;
const create_exam_service_1 = require("../../../services/faculty/exams/create_exam_service");
const createExamController = async (req, res) => {
    const facultyId = req.user.id;
    const facultyName = req.user.name;
    const subjectId = Number(req.params.subjectId);
    console.log("BODY:", req.body);
    if (!req.body) {
        console.log("No request body received");
    }
    else {
        console.log("questionIds:", req.body.questionIds);
    }
    console.log("questionIds:", req.body.questionIds);
    const exam = await (0, create_exam_service_1.createExamService)({
        facultyId,
        facultyName,
        subjectId,
        payload: req.body,
    });
    res.status(201).json(exam);
};
exports.createExamController = createExamController;
