"use client";

import { usePathname } from "next/navigation";

export default function NavbarTitle() {
  const pathname = usePathname();

  if (pathname.startsWith("/faculty")) {
    return (
      <h2 className="text-foreground truncate text-base font-bold sm:text-xl lg:text-2xl">
        Faculty Portal
      </h2>
    );
  }

  if (pathname.includes("/dashboard")) {
    return (
      <h2 className="text-foreground truncate text-base font-bold sm:text-xl lg:text-2xl">
        Dashboard
      </h2>
    );
  }

  if (pathname.includes("/users")) {
    return (
      <h2 className="text-foreground truncate text-base font-bold sm:text-xl lg:text-2xl">
        User Management
      </h2>
    );
  }

  if (pathname.includes("/academic")) {
    return (
      <h2 className="text-foreground truncate text-base font-bold sm:text-xl lg:text-2xl">
        Academic Management
      </h2>
    );
  }

  if (pathname.includes("/exams")) {
    return (
      <h2 className="text-foreground truncate text-base font-bold sm:text-xl lg:text-2xl">
        Examinations
      </h2>
    );
  }

  return (
    <h2 className="text-foreground truncate text-base font-bold sm:text-xl lg:text-2xl">
      CNAHS
    </h2>
  );
}
