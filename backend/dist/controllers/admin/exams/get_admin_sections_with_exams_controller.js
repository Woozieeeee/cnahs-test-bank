"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminSectionsWithExamsController = void 0;
const get_admin_sections_with_exams_service_1 = require("../../../services/admin/exams/get_admin_sections_with_exams_service");
const getAdminSectionsWithExamsController = async (req, res) => {
    try {
        const sectionsWithExams = await (0, get_admin_sections_with_exams_service_1.getAdminSectionsWithExamsService)();
        return res.json({
            success: true,
            data: sectionsWithExams,
        });
    }
    catch (error) {
        console.error("[AdminExams] Error fetching sections with exams:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch exam monitoring data.",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getAdminSectionsWithExamsController = getAdminSectionsWithExamsController;
