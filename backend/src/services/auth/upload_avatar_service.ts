import prisma from "../../lib/prisma";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_AVATAR_SIZE = 2 * 1024 * 1024;

export const uploadAvatarService = async (
  userId: number,
  buffer: Buffer,
  mimeType: string,
) => {
  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    throw new Error("Only JPEG, PNG, WebP, and GIF images are allowed");
  }

  if (buffer.length > MAX_AVATAR_SIZE) {
    throw new Error("Avatar must be 2MB or smaller");
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      avatar: new Uint8Array(buffer),
      avatarMimeType: mimeType,
    },
  });

  return updatedUser;
};

export const deleteAvatarService = async (userId: number) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      avatar: null,
      avatarMimeType: null,
    },
  });

  return updatedUser;
};

export const getAvatarService = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      avatar: true,
      avatarMimeType: true,
    },
  });

  if (!user?.avatar || !user.avatarMimeType) {
    return null;
  }

  return {
    buffer: Buffer.from(user.avatar),
    mimeType: user.avatarMimeType,
  };
};
