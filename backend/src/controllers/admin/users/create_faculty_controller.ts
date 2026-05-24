import { Request, Response } from "express";

import { createFacultyService } from "../../../services/admin/users/create_faculty_service";

export const createFaculty = async (req: Request, res: Response) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const faculty = await createFacultyService({
      name,
      username,
      password,
    });

    return res.status(201).json({
      message: "Faculty created successfully",
      faculty,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Server Error",
    });
  }
};
