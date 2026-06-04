"use client";

import { Bell } from "lucide-react";

export default function NavbarNotifications() {
  return (
    <button className="text-foreground hover:bg-muted relative rounded-full p-2 transition">
      <Bell size={20} />

      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
    </button>
  );
}
