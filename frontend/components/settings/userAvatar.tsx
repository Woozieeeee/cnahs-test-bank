"use client";

import clsx from "clsx";

import { useUserAvatar } from "@/hooks/useUserAvatar";

interface Props {
  name: string;
  hasAvatar?: boolean;
  avatarVersion?: string | Date;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-10 w-10 text-sm",
  md: "h-16 w-16 text-lg",
  lg: "h-24 w-24 text-2xl",
};

export default function UserAvatar({
  name,
  hasAvatar,
  avatarVersion,
  size = "sm",
  className,
}: Props) {
  const avatarUrl = useUserAvatar(hasAvatar, avatarVersion);

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={clsx(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-black font-semibold text-white",
        sizeClasses[size],
        className,
      )}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={`${name} avatar`}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        initials
      )}
    </div>
  );
}
