import { Request, Response } from "express";

import prisma from "../../../lib/prisma";

export const approveStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.user.update({
      where: {
        id: Number(id),
      },

      data: {
        status: "APPROVED",
      },
    });

    res.status(200).json({
      message: "Student approved successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
