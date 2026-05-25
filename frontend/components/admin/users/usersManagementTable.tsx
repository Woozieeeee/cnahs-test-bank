"use client";

import UsersTabs from "./usersTabs";
import UsersTable from "./usersTable";
import UsersSearch from "./usersSearch";
import UsersRoleFilter from "./usersRoleFilter";
import UsersPagination from "./usersPagination";
import MotionButton from "@/components/motion/motionButton";

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
  page: number;
  totalPages: number;
  roleFilter: string;
  search: string;
  setActiveTab: (tab: string) => void;
  setPage: (page: number) => void;
  onApprove: (id: number) => Promise<void>;
  onReject: (id: number) => Promise<void>;
  setSearch: (value: string) => void;
  setRoleFilter: (value: string) => void;
  onOpenFacultyModal: () => void;
}

export default function UsersManagementTable({
  users,
  activeTab,
  totalPages,
  search,
  roleFilter,
  page,
  onOpenFacultyModal,
  setActiveTab,
  setPage,
  setSearch,
  onApprove,
  onReject,
  setRoleFilter,
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

      <div
        className="
    mb-6
    flex
    items-start
    justify-between
    gap-4
  "
      >
        <div>
          <h2
            className="
        text-xl
        font-semibold
        text-slate-900
      "
          >
            Users
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage student and faculty accounts
          </p>
        </div>

        <MotionButton
          onClick={onOpenFacultyModal}
          className="
      rounded-xl
      bg-slate-900
      px-4
      py-2
      text-sm
      font-medium
      text-white
      transition
      hover:bg-slate-800
    "
        >
          Add Faculty
        </MotionButton>
      </div>

      {/* TABS */}

      <UsersTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* FILTERS */}

      <div
        className="
          mt-6
          flex
          flex-col
          gap-4
          md:flex-row
        "
      >
        <UsersSearch value={search} onChange={setSearch} />

        <UsersRoleFilter
          value={roleFilter}
          onChange={setRoleFilter}
        />
      </div>

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
