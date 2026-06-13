import { Request, Response } from "express";
import { getAdminExamMonitoringDetailsService } from "../../../services/admin/exams/get_admin_exam_monitoring_details_service";

export const getAdminExamMonitoringDetailsController = async (
  req: Request,
  res: Response
) => {
  try {
    const examId = parseInt(req.params.examId as string);

    if (isNaN(examId)) {
      return res.status(400).json({ message: "Invalid exam ID" });
    }

    // Cache for 5 seconds for real-time monitoring
    res.set({
      'Cache-Control': 'private, max-age=5',
      'Expires': new Date(Date.now() + 5000).toUTCString(),
    });

    const startTime = Date.now();
    const data = await getAdminExamMonitoringDetailsService(examId);
    const queryTime = Date.now() - startTime;

    if (queryTime > 1000) {
      console.warn(`⚠️  Slow admin exam monitoring query: ${queryTime}ms for exam ${examId}`);
    } else {
      console.log(`✓ Admin exam monitoring query: ${queryTime}ms for exam ${examId}`);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Failed to fetch admin exam monitoring details:", error);
    if ((error as Error).message.includes("not found")) {
      return res.status(404).json({ message: "Exam not found" });
    }
    return res.status(500).json({
      message: "Failed to fetch exam monitoring details",
      error: (error as Error).message,
    });
  }
};
