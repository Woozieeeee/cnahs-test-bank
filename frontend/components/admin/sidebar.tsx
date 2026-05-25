"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/auth_service";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();

      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside
      className="
        sticky
        top-0
        h-screen
        w-64
        border-r
        bg-white
        p-5
      "
    >
      <h1
        className="
          mb-8
          text-2xl
          font-bold
        "
      >
        CNAHS Admin
      </h1>

      <nav className="space-y-2">
        <Link
          href="/admin/dashboard"
          className="
            block
            rounded-lg
            p-3
            transition
            hover:bg-gray-100
          "
        >
          Dashboard
        </Link>

        <Link
          href="/admin/users"
          className="
            block
            rounded-lg
            p-3
            transition
            hover:bg-gray-100
          "
        >
          Users
        </Link>

        <Link
          href="/admin/exam"
          className="
            block
            rounded-lg
            p-3
            transition
            hover:bg-gray-100
          "
        >
          Exams
        </Link>

        <Link
          href="/admin/activity-logs"
          className="
            block
            rounded-lg
            p-3
            transition
            hover:bg-gray-100
          "
        >
          Activity Logs
        </Link>

        <button
          onClick={handleLogout}
          className="
            w-full
            rounded-lg
            p-3
            text-left
            transition
            hover:bg-red-100
          "
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
