import prisma from "../../lib/prisma";

interface UpdateProfileInput {
  name?: string;
  username?: string;
}

export const updateProfileService = async (
  userId: number,
  input: UpdateProfileInput,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const data: { name?: string; username?: string } = {};

  if (input.name !== undefined) {
    const trimmedName = input.name.trim();

    if (trimmedName.length < 2) {
      throw new Error("Name must be at least 2 characters");
    }

    if (trimmedName.length > 100) {
      throw new Error("Name must be 100 characters or fewer");
    }

    data.name = trimmedName;
  }

  if (input.username !== undefined) {
    if (user.role === "STUDENT") {
      throw new Error("Students cannot change their username");
    }

    const trimmedUsername = input.username.trim();

    if (trimmedUsername.length < 3) {
      throw new Error("Username must be at least 3 characters");
    }

    if (trimmedUsername.length > 50) {
      throw new Error("Username must be 50 characters or fewer");
    }

    if (!/^[a-zA-Z0-9._-]+$/.test(trimmedUsername)) {
      throw new Error(
        "Username can only contain letters, numbers, dots, underscores, and hyphens",
      );
    }

    const existing = await prisma.user.findFirst({
      where: {
        username: trimmedUsername,
        NOT: { id: userId },
      },
    });

    if (existing) {
      throw new Error("Username is already taken");
    }

    data.username = trimmedUsername;
  }

  if (Object.keys(data).length === 0) {
    throw new Error("No profile fields to update");
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data,
  });

  return updatedUser;
};
