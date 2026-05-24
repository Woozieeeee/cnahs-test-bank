"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/services/admin_service";
import UsersTable from "@/components/admin/users/usersTable";
import UsersLoader from "@/components/admin/users/usersLoader";
import UsersStatsBar from "@/components/admin/users/usersStatsBar";
import UsersTabs from "@/components/admin/users/usersTabs";
import UsersManagementTable from "@/components/admin/users/usersManagementTable";
import UsersPagination from "@/components/admin/users/usersPagination";
import { useUserActions } from "@/hooks/admin/users/useUserActions";
import AnimatedPage from "@/components/common/animatedPage";
import AddFacultyModal from "@/lib/components/admin/users/addFacultyModal";

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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [openFacultyModal, setOpenFacultyModal] =
    useState(false);
  const [roleFilter, setRoleFilter] = useState("ALL");

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
        const data = await getUsers({
          page,

          limit: 10,

          search,

          role: roleFilter,

          status: activeTab,
        });

        setUsers(data.users);

        setTotalPages(data.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, search, roleFilter, activeTab]);

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
    <AnimatedPage>
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
        <button
          onClick={() => setOpenFacultyModal(true)}
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Add Faculty
        </button>

        {/* STATS */}

        <UsersStatsBar
          total={users.length}
          pending={
            users.filter((u) => u.status === "PENDING")
              .length
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
        <UsersManagementTable
          users={filteredUsers}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          onApprove={approveUser}
          onReject={rejectUser}
          search={search}
          setSearch={setSearch}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
        />
      </div>
      <AddFacultyModal
        open={openFacultyModal}
        onOpenChange={setOpenFacultyModal}
        onSuccess={() => {
          window.location.reload();
        }}
      />
    </AnimatedPage>
  );
}
