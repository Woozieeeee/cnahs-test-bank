"use client";

import Link from "next/link";

import {
  Users,
  ClipboardList,
  FileText,
  GraduationCap,
} from "lucide-react";

import OverviewCard from "@/components/admin/overviewCard";

import QuickAccessCard from "@/components/admin/quickAccessCard";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-gray-800
          "
        >
          Welcome back, Admin
        </h1>

        <p className="mt-2 text-gray-500">
          Manage students, approvals, faculty, and
          examinations easily.
        </p>
      </div>

      {/* ========================= */}
      {/* QUICK ACCESS */}
      {/* ========================= */}

      <div>
        <h2
          className="
            mb-4
            text-xl
            font-semibold
            text-gray-800
          "
        >
          Quick Access
        </h2>

        <div
          className="
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          <QuickAccessCard
            title="Student Approvals"
            description="Review pending student accounts"
            href="/admin/approvals"
            icon={<ClipboardList size={28} />}
          />

          <QuickAccessCard
            title="Manage Students"
            description="View and manage student records"
            href="/admin/users"
            icon={<Users size={28} />}
          />

          <QuickAccessCard
            title="Manage Exams"
            description="Create and organize exams"
            href="/admin/exams"
            icon={<FileText size={28} />}
          />

          <QuickAccessCard
            title="Faculty Accounts"
            description="Manage faculty members"
            href="/admin/faculty"
            icon={<GraduationCap size={28} />}
          />
        </div>
      </div>

      {/* ========================= */}
      {/* SYSTEM OVERVIEW */}
      {/* ========================= */}

      <div>
        <h2
          className="
            mb-4
            text-xl
            font-semibold
            text-gray-800
          "
        >
          System Overview
        </h2>

        <div
          className="
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          <OverviewCard
            title="Total Students"
            value="120"
          />

          <OverviewCard
            title="Pending Accounts"
            value="15"
          />

          <OverviewCard title="Total Exams" value="8" />

          <OverviewCard
            title="Faculty Members"
            value="12"
          />
        </div>
      </div>

      {/* ========================= */}
      {/* RECENT REGISTRATIONS */}
      {/* ========================= */}

      <div
        className="
          rounded-2xl
          bg-white
          p-6
          shadow-sm
        "
      >
        <div
          className="
            mb-4
            flex
            items-center
            justify-between
          "
        >
          <h2
            className="
              text-xl
              font-semibold
            "
          >
            Recent Registrations
          </h2>

          <Link
            href="/admin/approvals"
            className="
              text-sm
              font-medium
              text-black
              hover:underline
            "
          >
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className="
                  border-b
                  text-left
                  text-gray-500
                "
              >
                <th className="p-3">Name</th>

                <th className="p-3">Student ID</th>

                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="p-3">John Doe</td>

                <td className="p-3">22-08364</td>

                <td className="p-3">Pending</td>
              </tr>

              <tr className="border-b">
                <td className="p-3">Jane Smith</td>

                <td className="p-3">22-09211</td>

                <td className="p-3">Approved</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================= */}
      {/* RECENT ACTIVITY */}
      {/* ========================= */}

      <div
        className="
          rounded-2xl
          bg-white
          p-6
          shadow-sm
        "
      >
        <h2
          className="
            mb-4
            text-xl
            font-semibold
          "
        >
          Recent Activity
        </h2>

        <div className="space-y-4">
          <div
            className="
              rounded-lg
              bg-gray-50
              p-4
            "
          >
            John Doe registered for an account.
          </div>

          <div
            className="
              rounded-lg
              bg-gray-50
              p-4
            "
          >
            Pharmacology Exam was created.
          </div>

          <div
            className="
              rounded-lg
              bg-gray-50
              p-4
            "
          >
            5 student accounts were approved today.
          </div>
        </div>
      </div>
    </div>
  );
}
