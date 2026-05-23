"use client";

import StatCard from "@/components/admin/statCard";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();

  const { user, loading } = useAuth();

  // =========================
  // AUTH PROTECTION
  // =========================

  useEffect(() => {
    if (!loading) {
      // NOT LOGGED IN
      if (!user) {
        router.push("/login");

        return;
      }

      // NOT ADMIN
      if (user.role !== "ADMIN") {
        router.push("/login");
      }
    }
  }, [user, loading, router]);

  // =========================
  // LOADING SCREEN
  // =========================

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
        "
      >
        Loading...
      </div>
    );
  }

  return (
    <div>
      {/* Page Title */}
      <div className="mb-6">
        <h1
          className="
            text-3xl
            font-bold
            text-gray-800
          "
        >
          Admin Dashboard
        </h1>

        <p className="text-gray-500">
          Overview of the system
        </p>
      </div>

      {/* Statistics Cards */}
      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        <StatCard
          title="Total Students"
          value={120}
          description="Registered students"
        />

        <StatCard
          title="Pending Accounts"
          value={15}
          description="Waiting approval"
        />

        <StatCard
          title="Approved Accounts"
          value={105}
          description="Active students"
        />

        <StatCard
          title="Total Exams"
          value={8}
          description="Available exams"
        />
      </div>

      {/* Recent Registrations */}
      <div
        className="
          mt-8
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
          Recent Registrations
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className="
                  border-b
                  text-left
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

      {/* Quick Actions */}
      <div className="mt-8">
        <h2
          className="
            mb-4
            text-xl
            font-semibold
          "
        >
          Quick Actions
        </h2>

        <div
          className="
            grid
            gap-6
            md:grid-cols-3
          "
        >
          <button
            className="
              rounded-2xl
              bg-white
              p-6
              text-left
              shadow-sm
              transition
              hover:bg-gray-50
            "
          >
            Approve Students
          </button>

          <button
            className="
              rounded-2xl
              bg-white
              p-6
              text-left
              shadow-sm
              transition
              hover:bg-gray-50
            "
          >
            Manage Users
          </button>

          <button
            className="
              rounded-2xl
              bg-white
              p-6
              text-left
              shadow-sm
              transition
              hover:bg-gray-50
            "
          >
            Create Exam
          </button>
        </div>
      </div>
    </div>
  );
}
