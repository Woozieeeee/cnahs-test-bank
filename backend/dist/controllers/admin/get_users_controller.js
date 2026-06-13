"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const get_users_service_1 = require("../../services/admin/users/get_users_service");
const getUsers = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = String(req.query.search || "");
        const role = String(req.query.role || "ALL");
        const status = String(req.query.status || "ALL");
        const data = await (0, get_users_service_1.getUsersService)({
            page,
            limit,
            search,
            role,
            status,
        });
        return res.json(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to fetch users",
        });
    }
};
exports.getUsers = getUsers;
