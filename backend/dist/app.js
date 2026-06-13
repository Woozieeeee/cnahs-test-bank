"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = __importDefault(require("./routes/auth_routes"));
const admin_routes_1 = __importDefault(require("./routes/admin_routes"));
const faculty_routes_1 = __importDefault(require("./routes/faculty_routes"));
const exam_routes_1 = __importDefault(require("./routes/exam_routes"));
const student_routes_1 = __importDefault(require("./routes/student_routes"));
const student_record_routes_1 = __importDefault(require("./routes/admin/student_record_routes"));
const notification_routes_1 = __importDefault(require("./routes/notification_routes"));
const dev_routes_1 = __importDefault(require("./routes/dev_routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://cnahs-test-bank.vercel.app"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", auth_routes_1.default);
app.use("/api/admin", admin_routes_1.default);
app.use("/api/faculty", faculty_routes_1.default);
app.use("/api/student", student_routes_1.default);
app.use("/api/notifications", notification_routes_1.default);
app.use("/exam", exam_routes_1.default);
app.use("/api/admin/academic/student-records", student_record_routes_1.default);
app.use("/api/dev", dev_routes_1.default);
exports.default = app;
