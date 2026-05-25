"use client";

import { usePathname } from "next/navigation";

export default function NavbarTitle() {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname.includes("/dashboard")) {
      return "Dashboard";
    }

    if (pathname.includes("/users")) {
      return "User Management";
    }

    if (pathname.includes("/faculty")) {
      return "Faculty Management";
    }

    if (pathname.includes("/exams")) {
      return "Examinations";
    }

    return "Admin Panel";
  };

  return (
    <h2
      className="
        text-2xl
        font-bold
        text-gray-800
      "
    >
      {getPageTitle()}
    </h2>
  );
}
