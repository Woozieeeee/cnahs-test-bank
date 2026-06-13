"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionDetailsController = void 0;
const get_question_details_service_1 = require("../../../../services/admin/academic/questions/get_question_details_service");
const getQuestionDetailsController = async (req, res) => {
    try {
        const questionId = Number(req.params.questionId);
        const question = await (0, get_question_details_service_1.getQuestionDetailsService)(questionId);
        return res.status(200).json(question);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to fetch question details",
        });
    }
};
exports.getQuestionDetailsController = getQuestionDetailsController;
