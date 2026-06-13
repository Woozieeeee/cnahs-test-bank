"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImportJobDetailsController = void 0;
const get_import_job_details_service_1 = require("../../../services/faculty/questions/get_import_job_details_service");
const getImportJobDetailsController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const jobId = Number(req.params.jobId);
        if (Number.isNaN(jobId)) {
            return res.status(400).json({
                message: "Invalid import job id.",
            });
        }
        const job = await (0, get_import_job_details_service_1.getImportJobDetailsService)(facultyId, jobId);
        return res.json(job);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message || "Failed to load import details.",
        });
    }
};
exports.getImportJobDetailsController = getImportJobDetailsController;
