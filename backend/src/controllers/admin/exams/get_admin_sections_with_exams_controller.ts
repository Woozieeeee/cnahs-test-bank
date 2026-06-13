import { Request, Response } from "express";
import { getAdminSectionsWithExamsService } from "../../../services/admin/exams/get_admin_sections_with_exams_service";

export const getAdminSectionsWithExamsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const sectionsWithExams = await getAdminSectionsWithExamsService();

    return res.json({
      success: true,
      data: sectionsWithExams,
    });
  } catch (error) {
    console.error("[AdminExams] Error fetching sections with exams:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch exam monitoring data.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
