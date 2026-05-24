import bcrypt from "bcrypt";

import prisma from "../../../lib/prisma";

interface CreateFacultyInput {
  name: string;
  username: string;
  password: string;
}

export const createFacultyService = async ({
  name,
  username,
  password,
}: CreateFacultyInput) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (existingUser) {
    throw new Error("Username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const faculty = await prisma.user.create({
    data: {
      name,
      username,
      password: hashedPassword,
      role: "FACULTY",
      status: "APPROVED",
      isFirstLogin: true,
    },
  });

  return faculty;
};
