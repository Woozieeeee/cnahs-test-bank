"use client";

import { useRouter } from "next/navigation";

import { LogOut, Settings, User } from "lucide-react";

import MotionButton from "@/components/motion/motionButton";

interface Props {
  settingsPath: string;
  onLogout: () => void;
}

export default function NavbarProfileDropdown({
  settingsPath,
  onLogout,
}: Props) {
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="p-1">
      <MotionButton
        onClick={() => navigate(`${settingsPath}?tab=account`)}
        className="hover:bg-muted flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition"
      >
        <User size={16} />
        Profile
      </MotionButton>

      <MotionButton
        onClick={() => navigate(settingsPath)}
        className="hover:bg-muted flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition"
      >
        <Settings size={16} />
        Settings
      </MotionButton>

      <div className="border-border my-1 border-t" />

      <MotionButton
        onClick={onLogout}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-500 transition hover:bg-red-500/10"
      >
        <LogOut size={16} />
        Logout
      </MotionButton>
    </div>
  );
}
