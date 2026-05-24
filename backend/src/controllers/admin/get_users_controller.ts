import { Request, Response } from "express";

import { getUsersService } from "../../services/admin/users/get_users_service";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsersService();

    return res.json(users);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};
