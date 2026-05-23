import { Request, Response } from "express";

import prisma from "../lib/prisma";

export const trackStatus = async (req: Request, res: Response) => {
  try {
    const studentId = String(req.params.studentId);

    const user = await prisma.user.findUnique({
      where: {
        studentId,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    return res.status(200).json({
      status: user.status,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};
