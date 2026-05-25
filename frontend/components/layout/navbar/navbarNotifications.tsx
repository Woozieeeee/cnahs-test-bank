"use client";

import { Bell } from "lucide-react";

export default function NavbarNotifications() {
  return (
    <button
      className="
        relative
        rounded-full
        p-2
        transition
        hover:bg-gray-100
      "
    >
      <Bell size={20} />

      <span
        className="
          absolute
          right-1
          top-1
          h-2
          w-2
          rounded-full
          bg-red-500
        "
      />
    </button>
  );
}
