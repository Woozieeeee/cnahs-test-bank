"use client";

import { memo, useMemo } from "react";

interface Props {
  name?: string;

  size?: "sm" | "md" | "lg";
}

function UserInitialsAvatar({ name, size = "md" }: Props) {
  const initials = useMemo(() => {
    return (
      name
        ?.split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "NA"
    );
  }, [name]);

  const sizeClass =
    size === "sm"
      ? "h-8 w-8 text-xs"
      : size === "lg"
        ? "h-14 w-14 text-base"
        : "h-11 w-11 text-sm";

  return (
    <div
      className={`bg-muted text-foreground flex items-center justify-center rounded-full font-semibold ${sizeClass} `}
    >
      {initials}
    </div>
  );
}

export default memo(UserInitialsAvatar);
