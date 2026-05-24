import { Request, Response } from "express";

import { registerService } from "../services/auth/register_service";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, studentId, password } = req.body;

    const user = await registerService({
      name,
      studentId,
      password,
    });

    return res.status(201).json({
      message: "Registration successful",

      user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
