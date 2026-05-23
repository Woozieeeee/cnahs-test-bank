import { Request, Response } from "express";

import prisma from "../../../lib/prisma";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalStudents = await prisma.user.count({
      where: {
        role: "STUDENT",
      },
    });

    const pendingAccounts = await prisma.user.count({
      where: {
        role: "STUDENT",

        status: "PENDING",
      },
    });

    const approvedAccounts = await prisma.user.count({
      where: {
        role: "STUDENT",

        status: "APPROVED",
      },
    });

    const totalFaculty = await prisma.user.count({
      where: {
        role: "FACULTY",
      },
    });

    const totalExams = 0;

    res.status(200).json({
      totalStudents,

      pendingAccounts,

      approvedAccounts,

      totalFaculty,

      totalExams,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
