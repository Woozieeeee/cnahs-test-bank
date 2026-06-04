import bcrypt from "bcrypt";

import prisma from "../../lib/prisma";

export const changePasswordService = async (
  userId: number,
  currentPassword: string,
  newPassword: string,
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }

  const samePassword = await bcrypt.compare(newPassword, user.password);

  if (samePassword) {
    throw new Error("New password must be different from current password");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      password: hashedPassword,

      isFirstLogin: false,
    },
  });

  return user;
};
