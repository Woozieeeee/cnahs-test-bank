import { Request, Response } from "express";

import { getUsersService } from "../../services/admin/users/get_users_service";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const search = String(req.query.search || "");

    const role = String(req.query.role || "ALL");

    const status = String(req.query.status || "ALL");

    const data = await getUsersService({
      page,

      limit,

      search,

      role,

      status,
    });

    return res.json(data);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};
