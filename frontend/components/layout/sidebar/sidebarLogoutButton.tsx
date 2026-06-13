"use client";

import { useRouter } from "next/navigation";

import { logoutUser } from "@/services/auth_service";
import { LogOut } from "lucide-react";
import { useSidebar } from "./sidebarContext";
import { useAuthContext } from "@/contexts/authContext";

interface Props {
  forceExpanded?: boolean;
}

export default function SidebarLogoutButton({
  forceExpanded = false,
}: Props) {
  const router = useRouter();
  const { collapsed } = useSidebar();
  const showLabel = forceExpanded || !collapsed;
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

  return (
    <button
      onClick={handleLogout}
      className={`flex w-full items-center gap-3 rounded-xl p-3 text-sm font-medium text-red-600 transition-all hover:bg-red-500/10 ${
        forceExpanded ? "" : "mt-6"
      }`}
    >
      <LogOut size={18} />

      {showLabel && <span>Logout</span>}
    </button>
  );
}
