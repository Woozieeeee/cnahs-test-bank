"use client";

import { useRouter } from "next/navigation";

import { logoutUser } from "@/services/auth_service";
import { LogOut } from "lucide-react";
import { useSidebar } from "./sidebarContext";

export default function SidebarLogoutButton() {
  const router = useRouter();
  const { collapsed } = useSidebar();
  const handleLogout = async () => {
    try {
      await logoutUser();

      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-6 flex w-full items-center gap-3 rounded-xl p-3 text-sm font-medium text-red-600 transition-all hover:bg-red-500/10"
    >
      <LogOut size={18} />

      {!collapsed && <span>Logout</span>}
    </button>
  );
}
