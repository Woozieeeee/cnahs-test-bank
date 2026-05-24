import { NextFunction, Response } from "express";

import { AuthRequest } from "./auth_middleware";

import { logActivity } from "../utils/log_activity";

// =========================
// EXCLUDED ROUTES
// =========================

const EXCLUDED_PATHS = new Set([
  "/activity-logs",

  "/recent-activity",

  "/faculty/create",
]);

// =========================
// CATEGORY MAPPING
// =========================

const getCategoryFromPath = (path: string) => {
  if (path.startsWith("/users") || path.startsWith("/faculty")) {
    return "USER_MANAGEMENT";
  }

  if (path.startsWith("/student-records")) {
    return "STUDENT_RECORDS";
  }

  if (
    path.startsWith("/pending-students") ||
    path.startsWith("/approve") ||
    path.startsWith("/reject")
  ) {
    return "APPROVALS";
  }

  if (path.startsWith("/dashboard")) {
    return "DASHBOARD";
  }

  return "SYSTEM";
};

// =========================
// ACTION LABELS
// =========================

const getActionLabel = (method: string, path: string) => {
  // FACULTY

  if (method === "POST" && path.includes("/faculty")) {
    return "CREATE_FACULTY";
  }

  // APPROVALS

  if (method === "PATCH" && path.includes("/approve")) {
    return "APPROVE_STUDENT";
  }

  if (method === "PATCH" && path.includes("/reject")) {
    return "REJECT_STUDENT";
  }

  // STUDENT RECORDS

  if (method === "POST" && path.includes("/student-records")) {
    return "UPLOAD_STUDENT_RECORDS";
  }

  // DEFAULT

  return `${method} ${path}`;
};

// =========================
// ADMIN ACTIVITY LOGGER
// =========================

export const adminActivityLogger = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const path = req.path || "";

  // =========================
  // SKIP ROUTES
  // =========================

  if (
    EXCLUDED_PATHS.has(path) ||
    path.startsWith("/approve") ||
    path.startsWith("/reject")
  ) {
    return next();
  }

  // =========================
  // SKIP GET REQUESTS
  // =========================

  if (req.method === "GET") {
    return next();
  }

  // =========================
  // AFTER RESPONSE
  // =========================

  res.on("finish", async () => {
    if (res.statusCode >= 400) return;

    const performedBy = req.user?.name || "Unknown Admin";

    const category = getCategoryFromPath(path);

    try {
      await logActivity({
        action: getActionLabel(req.method, path),

        category,

        severity: "INFO",

        performedBy,

        metadata: {
          path,

          method: req.method,

          params: req.params,

          query: req.query,
        },
      });
    } catch (error) {
      console.error("Admin activity log failed:", error);
    }
  });

  next();
};
