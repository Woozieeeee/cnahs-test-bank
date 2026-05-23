import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth_routes";
import adminRoutes from "./routes/admin_routes";

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

export default app;
