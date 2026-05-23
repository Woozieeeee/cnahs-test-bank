import { Request, Response } from "express";

import prisma from "../../../lib/prisma";

export const rejectStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.user.update({
      where: {
        id: Number(id),
      },

      data: {
        status: "REJECTED",
      },
    });

    res.status(200).json({
      message: "Student rejected successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
