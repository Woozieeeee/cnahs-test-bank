import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth_routes";
import adminRoutes from "./routes/admin_routes";
import examRoutes from "./routes/exam_routes";
import academicRoutes from "./routes/admin/academic_routes";

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
app.use("/api/admin/academic", academicRoutes);

export default app;
