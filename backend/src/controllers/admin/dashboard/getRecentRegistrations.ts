import { Request, Response } from "express";

import prisma from "../../../lib/prisma";

export const getRecentRegistrations = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: "STUDENT",
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 10,

      select: {
        id: true,

        name: true,

        studentId: true,

        status: true,

        createdAt: true,
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
