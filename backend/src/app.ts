import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth_routes";
import adminRoutes from "./routes/admin_routes";
import facultyRoutes from "./routes/faculty_routes";
import examRoutes from "./routes/exam_routes";
import studentRoutes from "./routes/student_routes";
import studentRecordRoutes from "./routes/admin/student_record_routes";
import notificationRoutes from "./routes/notification_routes";
import devRoutes from "./routes/dev_routes";
import { errorHandler } from "./middleware/error_middleware";

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:3000", "https://cnahs-test-bank.vercel.app"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/exam", examRoutes);
app.use(
  "/api/admin/academic/student-records",

  studentRecordRoutes,
);
app.use("/api/dev", devRoutes);

// Global error handler middleware - must be after all routes
app.use(errorHandler);

export default app;
