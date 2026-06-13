"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordExamViolation = void 0;
const create_activity_log_service_1 = require("./create_activity_log_service");
const violationMessages_1 = require("../../lib/constants/activity/violationMessages");
const violationSeverity_1 = require("../../lib/constants/activity/violationSeverity");
const recordExamViolation = async ({ violation, studentName, metadata, }) => {
    const message = violationMessages_1.VIOLATION_MESSAGES[violation];
    const severity = violationSeverity_1.VIOLATION_SEVERITY[violation];
    return (0, create_activity_log_service_1.createActivityLog)({
        action: message.action,
        description: message.description,
        categories: ["VIOLATIONS", "EXAM", "SECURITY"],
        severity,
        performedBy: studentName,
        targetUser: studentName,
        metadata: {
            violation,
            ...metadata,
        },
    });
};
exports.recordExamViolation = recordExamViolation;
