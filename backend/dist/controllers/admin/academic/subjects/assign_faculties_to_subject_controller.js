"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignFacultiesToSubject = void 0;
const assign_faculties_to_subject_service_1 = require("../../../../services/admin/academic/subjects/assign_faculties_to_subject_service");
const assignFacultiesToSubject = async (req, res) => {
    try {
        const subjectId = Number(req.params.id);
        const { facultyIds } = req.body;
        await (0, assign_faculties_to_subject_service_1.assignFacultiesToSubjectService)(subjectId, facultyIds);
        return res.json({
            message: "Faculty pool updated successfully",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.assignFacultiesToSubject = assignFacultiesToSubject;
