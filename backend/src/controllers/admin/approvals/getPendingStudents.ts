import { Request, Response } from "express";

import prisma from "../../../lib/prisma";

export const getPendingStudents = async (req: Request, res: Response) => {
  try {
    const students = await prisma.user.findMany({
      where: {
        role: "STUDENT",

        status: "PENDING",
      },

      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,

        name: true,

        studentId: true,

        status: true,

        createdAt: true,
      },
    });

    res.status(200).json(students);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
