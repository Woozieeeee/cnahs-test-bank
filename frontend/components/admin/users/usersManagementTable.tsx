"use client";

import UsersTabs from "./usersTabs";
import UsersTable from "./usersTable";
import UsersSearch from "./usersSearch";
import UsersRoleFilter from "./usersRoleFilter";
import Pagination from "@/components/common/pagination";
import MotionButton from "@/components/motion/motionButton";
import UsersBulkActions from "./usersBulkActions";

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
  selectedUsers: number[];
  setSelectedUsers: React.Dispatch<
    React.SetStateAction<number[]>
  >;
  sortField: string;
  sortOrder: "asc" | "desc";
  onSort: (field: string, order: "asc" | "desc") => void;
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
  selectedUsers,
  setSelectedUsers,
  sortField,
  sortOrder,
  onSort,
}: Props) {
  return (
    <div
      className="
        rounded-2xl
        bg-card
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
        text-foreground
      "
          >
            Users
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage student and faculty accounts
          </p>
        </div>

        <MotionButton
          onClick={onOpenFacultyModal}
          className="
      rounded-xl
      bg-primary
      px-4
      py-2
      text-sm
      font-medium
      text-primary-foreground
      transition
      hover:bg-primary/90
      cursor-pointer
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

      {/* BULK ACTIONS */}

      <div className="mt-6">
        <UsersBulkActions
          selectedCount={selectedUsers.length}
          onClear={() => setSelectedUsers([])}
          onApprove={() => {
            console.log("Approve selected:", selectedUsers);
          }}
          onReject={() => {
            console.log("Reject selected:", selectedUsers);
          }}
        />
      </div>

      {/* TABLE */}

      <div className="mt-6">
        <UsersTable
          users={users}
          onApprove={onApprove}
          onReject={onReject}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={onSort}
        />
      </div>

      {/* PAGINATION */}

      <div className="mt-6">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
