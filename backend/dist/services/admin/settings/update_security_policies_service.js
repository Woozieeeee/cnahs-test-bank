"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSecurityPoliciesService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const updateSecurityPoliciesService = async (data) => {
    try {
        // Validate password expiry days if provided
        if (data.passwordExpiryDays !== undefined) {
            if (data.passwordExpiryDays < 1 || data.passwordExpiryDays > 365) {
                throw new Error("Password expiry must be between 1 and 365 days");
            }
        }
        // Validate max login attempts if provided
        if (data.maxLoginAttempts !== undefined) {
            if (data.maxLoginAttempts < 1 || data.maxLoginAttempts > 10) {
                throw new Error("Max login attempts must be between 1 and 10");
            }
        }
        // Validate IP addresses if provided
        if (data.ipWhitelist && data.ipWhitelist.length > 0) {
            const ipRegex = /^(\d{1,3}\.){3}\d{1,3}(\/\d{1,2})?$|^[a-fA-F0-9:]+$/;
            for (const ip of data.ipWhitelist) {
                if (!ipRegex.test(ip.trim())) {
                    throw new Error(`Invalid IP address format: ${ip}`);
                }
            }
        }
        // Prepare update data
        const updateData = {};
        if (data.forcePasswordExpiry !== undefined) {
            updateData.forcePasswordExpiry = data.forcePasswordExpiry;
        }
        if (data.passwordExpiryDays !== undefined) {
            updateData.passwordExpiryDays = data.passwordExpiryDays;
        }
        if (data.enableTwoFactor !== undefined) {
            updateData.enableTwoFactor = data.enableTwoFactor;
        }
        if (data.trackLoginHistory !== undefined) {
            updateData.trackLoginHistory = data.trackLoginHistory;
        }
        if (data.enableIpWhitelist !== undefined) {
            updateData.enableIpWhitelist = data.enableIpWhitelist;
        }
        if (data.ipWhitelist !== undefined) {
            updateData.ipWhitelistJson = data.ipWhitelist
                ? JSON.stringify(data.ipWhitelist)
                : null;
        }
        if (data.maxLoginAttempts !== undefined) {
            updateData.maxLoginAttempts = data.maxLoginAttempts;
        }
        // Update security policies
        const settings = await prisma_1.default.systemSettings.update({
            where: { id: 1 },
            data: {
                ...updateData,
                updatedAt: new Date(),
            },
        });
        console.log("[SecurityPoliciesService] Policies updated");
        return settings;
    }
    catch (error) {
        console.error("[SecurityPoliciesService] Error updating policies:", error);
        throw error;
    }
};
exports.updateSecurityPoliciesService = updateSecurityPoliciesService;
