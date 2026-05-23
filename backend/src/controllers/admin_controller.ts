import { Request, Response } from "express";

import prisma from "../lib/prisma";

// =========================
// GET PENDING STUDENTS
// =========================

export const getPendingStudents = async (req: Request, res: Response) => {
  try {
    const students = await prisma.user.findMany({
      where: {
        role: "STUDENT",

        status: "PENDING",
      },

      select: {
        id: true,
        name: true,
        studentId: true,
        createdAt: true,
      },

      orderBy: {
        createdAt: "desc",
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

// =========================
// APPROVE STUDENT
// =========================

export const approveStudent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.user.update({
      where: {
        id,
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

// =========================
// REJECT STUDENT
// =========================

export const rejectStudent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.user.update({
      where: {
        id,
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
