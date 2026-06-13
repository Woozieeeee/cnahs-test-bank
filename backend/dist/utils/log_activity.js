"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logActivity = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const logActivity = async ({ action, categories = ["SYSTEM"], severity = "INFO", description, performedBy, targetUser, metadata, }) => {
    const log = await prisma_1.default.activityLog.create({
        data: {
            action,
            categories,
            severity,
            description,
            performedBy,
            targetUser,
            metadata,
        },
    });
    return log;
};
exports.logActivity = logActivity;
