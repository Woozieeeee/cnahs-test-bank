"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

const tabs = [
  {
    label: "Sections",

    href: "/admin/academic/sections",
  },

  {
    label: "Subjects",

    href: "/admin/academic/subjects",
  },

  {
    label: "Student Records",

    href: "/admin/academic/student-records",
  },
];

export default function AcademicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}

      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-slate-900
          "
        >
          Academic Management
        </h1>

        <p className="mt-2 text-slate-500">
          Manage academic structure, institutional records,
          and section organization.
        </p>
      </div>

      {/* TABS */}

      <div
        className="
          flex
          flex-wrap
          gap-2
          border-b
          border-slate-200
          pb-3
        "
      >
        {tabs.map((tab) => {
          const active = pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`
                rounded-xl
                px-4
                py-2
                text-sm
                font-medium
                transition

                ${
                  active
                    ? `
                      bg-slate-900
                      text-white
                    `
                    : `
                      text-slate-600
                      hover:bg-slate-100
                    `
                }
              `}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* PAGE CONTENT */}

      <div>{children}</div>
    </div>
  );
}
