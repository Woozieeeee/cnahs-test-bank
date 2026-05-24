"use client";

import UsersTabs from "./usersTabs";

import UsersTable from "./usersTable";

import UsersPagination from "./usersPagination";

interface User {
  id: number;

  name: string;

  studentId: string;

  username?: string;

  role: string;

  status: string;

  createdAt: string;
}

interface Props {
  users: User[];

  activeTab: string;

  setActiveTab: (tab: string) => void;

  page: number;

  setPage: (page: number) => void;

  totalPages: number;

  onApprove: (id: number) => Promise<void>;

  onReject: (id: number) => Promise<void>;
}

export default function UsersManagementTable({
  users,

  activeTab,

  setActiveTab,

  page,

  setPage,

  totalPages,

  onApprove,

  onReject,
}: Props) {
  return (
    <div
      className="
        rounded-2xl
        bg-white
        p-6
        shadow-sm
      "
    >
      {/* HEADER */}

      <div className="mb-6">
        <h2
          className="
            text-xl
            font-semibold
          "
        >
          Users
        </h2>

        <p className="text-sm text-gray-500">
          Manage student and faculty accounts
        </p>
      </div>

      {/* TABS */}

      <UsersTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* TABLE */}

      <div className="mt-6">
        <UsersTable
          users={users}
          onApprove={onApprove}
          onReject={onReject}
        />
      </div>

      {/* PAGINATION */}

      <div className="mt-6">
        <UsersPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
