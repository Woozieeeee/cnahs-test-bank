"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectDetailsController = void 0;
const student_subject_details_service_1 = require("../../services/student/student_subject_details_service");
/**
 * GET /api/student/subjects/:subjectId
 * Get subject details with all tiers and exams for a student
 */
const getSubjectDetailsController = async (req, res) => {
    try {
        console.log("[SubjectDetails] Request user object:", req.user);
        const studentId = req.user?.id;
        const subjectIdOrSlugParam = Array.isArray(req.params.subjectId)
            ? req.params.subjectId[0]
            : req.params.subjectId;
        console.log("[SubjectDetails] Student ID:", studentId, "Subject ID or Slug:", subjectIdOrSlugParam);
        if (!studentId) {
            console.error("[SubjectDetails] No student ID found in auth");
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Student ID not found",
            });
        }
        // Try to parse as number first, otherwise treat as slug
        let subjectIdOrSlug;
        const parsed = parseInt(subjectIdOrSlugParam, 10);
        if (!isNaN(parsed)) {
            subjectIdOrSlug = parsed;
        }
        else {
            subjectIdOrSlug = subjectIdOrSlugParam;
        }
        console.log("[SubjectDetails] Parsed as:", typeof subjectIdOrSlug, subjectIdOrSlug);
        const subjectDetails = await (0, student_subject_details_service_1.getSubjectDetails)(studentId, subjectIdOrSlug);
        if (!subjectDetails) {
            console.error(`[SubjectDetails] No subject details found for student ${studentId}, subject ${subjectIdOrSlug}`);
            return res.status(404).json({
                success: false,
                message: "Subject not found or access denied",
            });
        }
        return res.status(200).json({
            success: true,
            data: subjectDetails,
        });
    }
    catch (error) {
        console.error("Error fetching subject details:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch subject details",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getSubjectDetailsController = getSubjectDetailsController;
