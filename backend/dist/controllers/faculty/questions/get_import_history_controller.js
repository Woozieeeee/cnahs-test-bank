"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImportHistoryController = void 0;
const get_import_history_service_1 = require("../../../services/faculty/questions/get_import_history_service");
const getImportHistoryController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const topicId = Number(req.params.topicId);
        const history = await (0, get_import_history_service_1.getImportHistoryService)(facultyId, topicId);
        return res.json(history);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to load import history.",
        });
    }
};
exports.getImportHistoryController = getImportHistoryController;
