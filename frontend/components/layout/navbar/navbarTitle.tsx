"use client";

import { usePathname } from "next/navigation";

export default function NavbarTitle() {
  const pathname = usePathname();

  if (pathname.startsWith("/faculty")) {
    return (
      <h2 className="text-foreground text-2xl font-bold">
        Faculty Portal
      </h2>
    );
  }

  if (pathname.includes("/dashboard")) {
    return (
      <h2 className="text-foreground text-2xl font-bold">
        Dashboard
      </h2>
    );
  }

  if (pathname.includes("/users")) {
    return (
      <h2 className="text-foreground text-2xl font-bold">
        User Management
      </h2>
    );
  }

  if (pathname.includes("/academic")) {
    return (
      <h2 className="text-foreground text-2xl font-bold">
        Academic Management
      </h2>
    );
  }

  if (pathname.includes("/exams")) {
    return (
      <h2 className="text-foreground text-2xl font-bold">
        Examinations
      </h2>
    );
  }

  return (
    <h2 className="text-foreground text-2xl font-bold">
      CNAHS
    </h2>
  );
}
