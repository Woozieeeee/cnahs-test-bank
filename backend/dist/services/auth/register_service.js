"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const admin_notification_handler_1 = require("../notification/admin_notification_handler");
const registerService = async ({ studentId, password, }) => {
    // =========================
    // FIND OFFICIAL RECORD
    // =========================
    const studentRecord = await prisma_1.default.studentRecord.findUnique({
        where: {
            studentId,
        },
    });
    // =========================
    // RECORD NOT FOUND
    // =========================
    if (!studentRecord) {
        throw new Error("Student record not found");
    }
    // =========================
    // BUILD FULL NAME
    // =========================
    const fullName = [
        studentRecord.firstName,
        studentRecord.middleName,
        studentRecord.lastName,
        studentRecord.suffix,
    ]
        .filter(Boolean)
        .join(" ");
    // =========================
    // CHECK EXISTING USER
    // =========================
    const existingUser = await prisma_1.default.user.findUnique({
        where: {
            studentId,
        },
    });
    if (existingUser) {
        throw new Error("Student already registered");
    }
    // =========================
    // PASSWORD VALIDATION
    // =========================
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    if (!strongPassword.test(password)) {
        throw new Error("Password does not meet security requirements");
    }
    // =========================
    // HASH PASSWORD
    // =========================
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    // =========================
    // CREATE USER
    // =========================
    const user = await prisma_1.default.user.create({
        data: {
            name: fullName,
            studentId,
            password: hashedPassword,
            role: "STUDENT",
            status: "PENDING",
            isFirstLogin: false,
        },
    });
    // =========================
    // ACTIVITY LOG
    // =========================
    await prisma_1.default.activityLog.create({
        data: {
            action: "Student Registration",
            categories: ["AUTH"],
            severity: "INFO",
            description: `${fullName} submitted a registration request.`,
            performedBy: fullName,
            targetUser: fullName,
        },
    });
    void admin_notification_handler_1.adminNotificationHandler
        .notifyUserApprovalRequired(user.id)
        .catch((error) => {
        console.error("Failed to send approval notification:", error);
    });
    return user;
};
exports.registerService = registerService;
