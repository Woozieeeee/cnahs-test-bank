import { Request, Response } from "express";
import { getSubjectDetails } from "../../services/student/student_subject_details_service";

/**
 * GET /api/student/subjects/:subjectId
 * Get subject details with all tiers and exams for a student
 */
export const getSubjectDetailsController = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("[SubjectDetails] Request user object:", (req as any).user);
    
    const studentId = (req as any).user?.id;
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
    let subjectIdOrSlug: number | string;
    const parsed = parseInt(subjectIdOrSlugParam, 10);
    if (!isNaN(parsed)) {
      subjectIdOrSlug = parsed;
    } else {
      subjectIdOrSlug = subjectIdOrSlugParam;
    }

    console.log("[SubjectDetails] Parsed as:", typeof subjectIdOrSlug, subjectIdOrSlug);

    const subjectDetails = await getSubjectDetails(studentId, subjectIdOrSlug);

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
  } catch (error) {
    console.error("Error fetching subject details:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch subject details",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
