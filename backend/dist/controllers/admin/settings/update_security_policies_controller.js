"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSecurityPoliciesController = void 0;
const update_security_policies_service_1 = require("../../../services/admin/settings/update_security_policies_service");
const updateSecurityPoliciesController = async (req, res) => {
    try {
        const adminId = req.user?.id;
        if (!adminId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Admin ID not found",
            });
        }
        const settings = await (0, update_security_policies_service_1.updateSecurityPoliciesService)(req.body);
        console.log("[SecurityPoliciesController] Policies updated by admin:", adminId);
        return res.json({
            success: true,
            message: "Security policies updated successfully",
            data: settings,
        });
    }
    catch (error) {
        console.error("[SecurityPoliciesController] Error updating policies:", error);
        if (error instanceof Error && error.message.includes("must be")) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        if (error instanceof Error && error.message.includes("Invalid IP")) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Failed to update security policies",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.updateSecurityPoliciesController = updateSecurityPoliciesController;
