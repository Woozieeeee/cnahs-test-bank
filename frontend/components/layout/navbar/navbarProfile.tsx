"use client";

import { useRouter } from "next/navigation";

import { ChevronDown } from "lucide-react";

import MotionDropdown from "@/components/motion/motionDropdown";
import UserAvatar from "@/components/settings/userAvatar";
import NavbarProfileDropdown from "./navbarProfileDropdown";
import { logoutUser } from "@/services/auth_service";
import {
  formatRoleLabel,
  getSettingsPath,
  type UserRole,
} from "@/lib/userSettings";
import { useAuthContext } from "@/contexts/authContext";

interface Props {
  name: string;
  userRole: UserRole;
  hasAvatar?: boolean;
  avatarVersion?: string | Date;
}

export default function NavbarProfile({
  name,
  userRole,
  hasAvatar,
  avatarVersion,
}: Props) {
  const router = useRouter();
  const settingsPath = getSettingsPath(userRole);
  const roleLabel = formatRoleLabel(userRole);
  const { setUser } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const trigger = (
    <div className="text-foreground hover:bg-muted flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition">
      <div className="hidden text-right sm:block">
        <p className="font-medium">{name}</p>
        <p className="text-muted-foreground text-sm">
          {roleLabel}
        </p>
      </div>

      <UserAvatar
        name={name}
        hasAvatar={hasAvatar}
        avatarVersion={avatarVersion}
        size="sm"
      />

      <ChevronDown
        size={18}
        className="text-muted-foreground"
      />
    </div>
  );

  return (
    <MotionDropdown
      trigger={trigger}
      align="right"
      width="w-52"
    >
      <NavbarProfileDropdown
        settingsPath={settingsPath}
        onLogout={handleLogout}
      />
    </MotionDropdown>
  );
}
