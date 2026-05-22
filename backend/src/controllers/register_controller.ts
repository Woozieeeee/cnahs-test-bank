import { Request, Response } from "express";

import prisma from "../lib/prisma";

import { hashPassword } from "../utils/hashPassword";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      studentId,
      password,
    } = req.body;

    // =========================
    // VALIDATE STUDENT ID
    // =========================

    const studentIdRegex =
      /^\d{2}-\d{5}$/;

    if (!studentId) {
      return res.status(400).json({
        message: "Student ID required",
      });
    }

    if (
      !studentIdRegex.test(studentId)
    ) {
      return res.status(400).json({
        message:
          "Invalid student ID format",
      });
    }

    // =========================
    // CHECK EXISTING USER
    // =========================

    const existingUser =
      await prisma.user.findUnique({
        where: {
          studentId,
        },
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "Student already exists",
      });
    }

    // =========================
    // HASH PASSWORD
    // =========================

    const hashedPassword =
      await hashPassword(password);

    // =========================
    // CREATE USER
    // =========================

    const user = await prisma.user.create({
      data: {
        name,
        studentId,
        password: hashedPassword,

        role: "STUDENT",

        status: "PENDING",
      },
    });

    // =========================
    // SAFE RESPONSE
    // =========================

    res.status(201).json({
      message:
        "Registration submitted successfully",

      user: {
        name: user.name,

        role: user.role,

        status: user.status,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};