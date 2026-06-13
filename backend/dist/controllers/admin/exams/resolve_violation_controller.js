"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveViolationController = void 0;
const resolve_violation_service_1 = require("../../../services/admin/exams/resolve_violation_service");
const resolveViolationController = async (req, res) => {
    try {
        const violationIdParam = Array.isArray(req.params.violationId)
            ? req.params.violationId[0]
            : req.params.violationId;
        const violationId = parseInt(violationIdParam);
        if (isNaN(violationId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid violation ID",
            });
        }
        const { notes } = req.body;
        const adminId = req.user?.id;
        const adminName = req.user?.name || "Admin";
        const updated = await (0, resolve_violation_service_1.resolveViolationService)(violationId, adminName, notes);
        return res.json({
            success: true,
            message: "Violation marked as resolved",
            data: updated,
        });
    }
    catch (error) {
        console.error("[AdminResolveViolation] Error:", error);
        if (error instanceof Error && error.message === "Violation not found") {
            return res.status(404).json({
                success: false,
                message: "Violation not found",
            });
        }
        return res.status(500).json({
            success: false,
            message: "Failed to resolve violation.",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.resolveViolationController = resolveViolationController;
