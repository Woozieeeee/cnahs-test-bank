"use client";

import { useRouter } from "next/navigation";

import { logoutUser } from "@/services/auth_service";

export default function SidebarLogoutButton() {
  const router = useRouter();

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
      className="
        mt-6
        w-full
        rounded-xl
        p-3
        text-left
        text-sm
        font-medium
        text-red-600
        transition
        hover:bg-red-500/10
      "
    >
      Logout
    </button>
  );
}
