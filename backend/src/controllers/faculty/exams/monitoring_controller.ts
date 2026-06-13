import { Request, Response } from "express";
import { getFacultyExamsService } from "../../../services/faculty/exams/get_faculty_exams_service";
import { getExamMonitoringDetailsService } from "../../../services/faculty/exams/get_exam_monitoring_details_service";
import { getExamActivityFeedService } from "../../../services/faculty/exams/get_exam_activity_feed_service";
import { getExamActiveStudentsService } from "../../../services/faculty/exams/exam_active_students_service";
import { getExamViolationsService } from "../../../services/faculty/exams/exam_violations_service";

export const getFacultyExamsController = async (
  req: Request,
  res: Response
) => {
  try {
    const facultyId = (req as any).user.id;
    const status = req.query.status as string | undefined;
    const subjectId = req.query.subjectId as string | undefined;
    const searchQuery = req.query.search as string | undefined;

    const filter = {
      status: status ? status.split(",") : undefined,
      subjectId: subjectId ? parseInt(subjectId) : undefined,
      searchQuery,
    };

    // Add caching headers: 30 seconds for exam data
    res.set({
      'Cache-Control': 'private, max-age=30',
      'Expires': new Date(Date.now() + 30000).toUTCString(),
    });

    // Track performance
    const startTime = Date.now();
    const data = await getFacultyExamsService(facultyId, filter);
    const queryTime = Date.now() - startTime;

    // Log performance metrics
    if (queryTime > 1000) {
      console.warn(`⚠️  Slow exams query: ${queryTime}ms for ${data.length} exams`);
    } else {
      console.log(`✓ Exams query: ${queryTime}ms for ${data.length} exams`);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Failed to fetch exams data:", error);
    return res.status(500).json({
      message: "Failed to fetch exams data",
      error: (error as Error).message,
    });
  }
};

export const getExamMonitoringDetailsController = async (
  req: Request,
  res: Response
) => {
  try {
    const facultyId = (req as any).user.id;
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
    const data = await getExamMonitoringDetailsService(examId, facultyId);
    const queryTime = Date.now() - startTime;

    if (queryTime > 1000) {
      console.warn(`⚠️  Slow exam monitoring query: ${queryTime}ms for exam ${examId}`);
    } else {
      console.log(`✓ Exam monitoring query: ${queryTime}ms for exam ${examId}`);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Failed to fetch exam monitoring details:", error);
    if ((error as Error).message.includes("not found")) {
      return res.status(404).json({ message: "Exam not found" });
    }
    if ((error as Error).message.includes("unauthorized")) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    return res.status(500).json({
      message: "Failed to fetch exam monitoring details",
      error: (error as Error).message,
    });
  }
};

export const getExamActiveStudentsController = async (
  req: Request,
  res: Response
) => {
  try {
    const facultyId = (req as any).user.id;
    const examId = parseInt(req.params.examId as string);

    if (isNaN(examId)) {
      return res.status(400).json({ message: "Invalid exam ID" });
    }

    // Cache for 5 seconds
    res.set({
      'Cache-Control': 'private, max-age=5',
      'Expires': new Date(Date.now() + 5000).toUTCString(),
    });

    const data = await getExamActiveStudentsService(examId, facultyId);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Failed to fetch active students:", error);
    if ((error as Error).message.includes("not found")) {
      return res.status(404).json({ message: "Exam not found" });
    }
    return res.status(500).json({
      message: "Failed to fetch active students",
      error: (error as Error).message,
    });
  }
};

export const getExamViolationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const facultyId = (req as any).user.id;
    const examId = parseInt(req.params.examId as string);
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const unresolved = req.query.unresolved === "true";
    const severityQuery = req.query.severity;
    const typeQuery = req.query.type;
    const severity = typeof severityQuery === "string" ? severityQuery.split(",") : undefined;
    const type = typeof typeQuery === "string" ? typeQuery.split(",") : undefined;

    if (isNaN(examId)) {
      return res.status(400).json({ message: "Invalid exam ID" });
    }

    // Cache for 10 seconds
    res.set({
      'Cache-Control': 'private, max-age=10',
      'Expires': new Date(Date.now() + 10000).toUTCString(),
    });

    const data = await getExamViolationsService(examId, facultyId, {
      limit,
      unresolved,
      severity,
      type,
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error("Failed to fetch violations:", error);
    if ((error as Error).message.includes("not found")) {
      return res.status(404).json({ message: "Exam not found" });
    }
    return res.status(500).json({
      message: "Failed to fetch violations",
      error: (error as Error).message,
    });
  }
};

export const getRecentViolationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const facultyId = (req as any).user.id;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;

    // Cache for 15 seconds
    res.set({
      'Cache-Control': 'private, max-age=15',
      'Expires': new Date(Date.now() + 15000).toUTCString(),
    });

    const { getRecentViolationsService } = await import("../../../services/faculty/exams/exam_violations_service.js");
    const data = await getRecentViolationsService(facultyId, limit);

    return res.status(200).json(data);
  } catch (error) {
    console.error("Failed to fetch recent violations:", error);
    return res.status(500).json({
      message: "Failed to fetch recent violations",
      error: (error as Error).message,
    });
  }
};

export const getExamActivityFeedController = async (
  req: Request,
  res: Response
) => {
  try {
    const facultyId = (req as any).user.id;
    const examId = parseInt(req.params.examId as string);
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
    const studentIdQuery = req.query.studentId;
    const studentId = typeof studentIdQuery === "string" ? parseInt(studentIdQuery) : undefined;
    const severityQuery = req.query.severity;
    const typeQuery = req.query.type;
    const severity = typeof severityQuery === "string" ? severityQuery.split(",") : undefined;
    const type = typeof typeQuery === "string" ? typeQuery.split(",") : undefined;

    if (isNaN(examId)) {
      return res.status(400).json({ message: "Invalid exam ID" });
    }

    // Cache for 5 seconds
    res.set({
      'Cache-Control': 'private, max-age=5',
      'Expires': new Date(Date.now() + 5000).toUTCString(),
    });

    const data = await getExamActivityFeedService(examId, facultyId, {
      limit,
      offset,
      studentId,
      severity,
      type,
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error("Failed to fetch activity feed:", error);
    if ((error as Error).message.includes("not found")) {
      return res.status(404).json({ message: "Exam not found" });
    }
    return res.status(500).json({
      message: "Failed to fetch activity feed",
      error: (error as Error).message,
    });
  }
};
