import { Request, Response } from "express";

import { getUsersService } from "../../services/admin/users/get_users_service";

export const getUsers = async (req: Request, res: Response) => {
  try {
    // =========================
    // QUERY PARAMS
    // =========================

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    // =========================
    // FETCH USERS
    // =========================

    const data = await getUsersService({
      page,

      limit,
    });

    return res.json(data);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};
