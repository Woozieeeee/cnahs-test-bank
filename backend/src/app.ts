import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth_routes";
import adminRoutes from "./routes/admin_routes";
import examRoutes from "./routes/exam_routes";
import studentRecordRoutes from "./routes/admin/student_record_routes";
import devRoutes from "./routes/dev_routes";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://cnahs-test-bank.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/exam", examRoutes);
app.use(
  "/api/admin/academic/student-records",

  studentRecordRoutes,
);
app.use("api/dev", devRoutes);

export default app;
