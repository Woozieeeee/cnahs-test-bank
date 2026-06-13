import { Request, Response } from "express";
import { getAdminSectionExamDetailsService } from "../../../services/admin/exams/get_admin_section_exam_details_service";

export const getAdminSectionExamDetailsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const sectionId = Number(req.params.sectionId);

    if (!sectionId || isNaN(sectionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid section ID",
      });
    }

    const sectionExamDetails = await getAdminSectionExamDetailsService(
      sectionId,
    );

    return res.json({
      success: true,
      data: sectionExamDetails,
    });
  } catch (error) {
    console.error(
      "[AdminExams] Error fetching section exam details:",
      error,
    );

    if (error instanceof Error && error.message.includes("not found")) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch section exam details.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
