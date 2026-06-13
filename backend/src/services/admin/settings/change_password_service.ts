import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";

interface ChangePasswordInput {
  userId: number;
  currentPassword: string;
  newPassword: string;
}

export const changePasswordService = async (data: ChangePasswordInput) => {
  try {
    const { userId, currentPassword, newPassword } = data;

    // Validate passwords
    if (!currentPassword || !newPassword) {
      throw new Error("Current password and new password are required");
    }

    if (currentPassword === newPassword) {
      throw new Error("New password must be different from current password");
    }

    if (newPassword.length < 8) {
      throw new Error("New password must be at least 8 characters long");
    }

    // Fetch user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, password: true, username: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Verify current password
    const passwordMatches = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!passwordMatches) {
      throw new Error("Current password is incorrect");
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        updatedAt: new Date(),
      },
    });

    console.log(`[PasswordService] Password changed for user: ${user.username}`);
    return { success: true, message: "Password changed successfully" };
  } catch (error) {
    console.error("[PasswordService] Error changing password:", error);
    throw error;
  }
};
