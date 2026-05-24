"use client";

import { useEffect, useState } from "react";

import { getUsers } from "@/services/admin_service";

import UsersTable from "@/components/admin/users/usersTable";

import UsersLoader from "@/components/admin/users/usersLoader";

import UsersStatsBar from "@/components/admin/users/usersStatsBar";

import UsersTabs from "@/components/admin/users/usersTabs";

import { useUserActions } from "@/hooks/admin/users/useUserActions";

interface User {
  id: number;

  name: string;

  studentId: string;

  username?: string;

  role: string;

  status: string;

  createdAt: string;
}

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState("ALL");

  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);

  // =========================
  // USER ACTIONS HOOK
  // =========================

  const {
    approveUser,

    rejectUser,
  } = useUserActions(setUsers);

  // =========================
  // FETCH USERS
  // =========================

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();

        setUsers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return <UsersLoader />;
  }

  // =========================
  // FILTER USERS
  // =========================

  const filteredUsers =
    activeTab === "ALL"
      ? users
      : users.filter((user) => user.status === activeTab);

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-gray-800
          "
        >
          User Management
        </h1>

        <p className="mt-2 text-gray-500">
          Manage student and faculty accounts.
        </p>
      </div>

      {/* STATS */}

      <UsersStatsBar
        total={users.length}
        pending={
          users.filter((u) => u.status === "PENDING").length
        }
        approved={
          users.filter((u) => u.status === "APPROVED")
            .length
        }
        rejected={
          users.filter((u) => u.status === "REJECTED")
            .length
        }
      />

      {/* TABS */}

      <UsersTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* TABLE */}

      <UsersTable
        users={filteredUsers}
        onApprove={approveUser}
        onReject={rejectUser}
      />
    </div>
  );
}
