import { Request, Response, NextFunction } from "express";

// Global error handler middleware
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the actual error with stack trace to the server logs
  console.error("ERROR:", {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
  });

  // Determine status code
  const statusCode = err.statusCode || res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // Send generic response to frontend
  res.json({
    message: statusCode === 500 ? "Internal Server Error" : err.message,
  });
};
