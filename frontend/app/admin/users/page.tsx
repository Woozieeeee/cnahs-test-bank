"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/services/admin_service";
import UsersTable from "@/components/admin/users/usersTable";
import UsersLoader from "@/components/admin/users/usersLoader";
import UsersStatsBar from "@/components/admin/users/usersStatsBar";
import UsersTabs from "@/components/admin/users/usersTabs";
import UsersManagementTable from "@/components/admin/users/usersManagementTable";
import { useUserActions } from "@/hooks/admin/users/useUserActions";
import AnimatedPage from "@/components/common/animatedPage";
import AddFacultyModal from "@/components/admin/users/addFacultyModal";

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
  const [selectedUsers, setSelectedUsers] = useState<
    number[]
  >([]);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<
    "asc" | "desc"
  >("desc");
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

  const filteredUsers = (
    activeTab === "ALL"
      ? users
      : users.filter((user) => user.status === activeTab)
  )
    .filter((user) =>
      [user.name, user.studentId, user.role, user.status]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = String(
        a[sortField as keyof User] || ""
      ).toLowerCase();

      const bValue = String(
        b[sortField as keyof User] || ""
      ).toLowerCase();

      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      }

      return bValue.localeCompare(aValue);
    });

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div>
          <h1
            className="
            text-3xl
            font-bold
            text-foreground
          "
          >
            User Management
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage student and faculty accounts.
          </p>
        </div>

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
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          onOpenFacultyModal={() =>
            setOpenFacultyModal(true)
          }
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={(field, order) => {
            setSortField(field);
            setSortOrder(order);
          }}
        />
      </div>
      <AddFacultyModal
        open={openFacultyModal}
        onOpenChange={setOpenFacultyModal}
        onSuccess={fetchUsers}
      />
    </AnimatedPage>
  );
}
