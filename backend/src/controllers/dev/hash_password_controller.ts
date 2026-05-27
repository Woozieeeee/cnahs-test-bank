import { Request, Response } from "express";

import bcrypt from "bcryptjs";

export const hashPassword = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    return res.json({
      hashedPassword,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
