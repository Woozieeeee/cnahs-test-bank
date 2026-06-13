"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActivityLog = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const createActivityLog = async ({ action, performedBy, targetUser, categories = ["APPROVALS", "SYSTEM"], severity = "INFO", description, metadata, }) => {
    return prisma_1.default.activityLog.create({
        data: {
            action,
            performedBy,
            targetUser,
            categories,
            severity,
            description,
            metadata,
        },
    });
};
exports.createActivityLog = createActivityLog;
