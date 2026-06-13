"use client";

import { Loader2 } from "lucide-react";
import UsersTabs, { type UserFilterTab, getFilterTabDescription } from "./usersTabs";
import UsersTable from "./usersTable";
import UsersSearch from "./usersSearch";
import Pagination from "@/components/common/pagination";
import MotionButton from "@/components/motion/motionButton";
import UsersBulkActions from "./usersBulkActions";
import EditUserModal from "./editUserModal";
import type { ManagedUser } from "@/hooks/admin/users/useUserActions";

interface Props {
  users: ManagedUser[];
  activeTab: UserFilterTab;
  page: number;
  totalPages: number;
  isRefreshing: boolean;
  search: string;
  searchSuggestions: string[];
  editingUser: ManagedUser | null;
  isEditModalOpen: boolean;
  selectedUsers: number[];
  onTabChange: (tab: UserFilterTab) => void;
  setPage: (page: number) => void;
  onApprove: (id: number) => Promise<void>;
  onReject: (id: number) => Promise<void>;
  onDisable: (id: number, userName: string) => Promise<void>;
  onEnable: (id: number, userName: string) => Promise<void>;
  onEditUser: (user: ManagedUser) => void;
  onCloseEditModal: () => void;
  onSaveUser: (
    userId: number,
    data: { name?: string; username?: string; password?: string },
  ) => Promise<void>;
  onBulkApprove: () => void;
  onBulkReject: () => void;
  setSearch: (value: string) => void;
  onOpenFacultyModal: () => void;
  setSelectedUsers: React.Dispatch<React.SetStateAction<number[]>>;
  sortField: string;
  sortOrder: "asc" | "desc";
  onSort: (field: string, order: "asc" | "desc") => void;
}

export default function UsersManagementTable({
  users,
  activeTab,
  totalPages,
  isRefreshing,
  search,
  searchSuggestions,
  page,
  onOpenFacultyModal,
  onTabChange,
  setPage,
  setSearch,
  onApprove,
  onReject,
  onDisable,
  onEnable,
  onEditUser,
  onCloseEditModal,
  onSaveUser,
  onBulkApprove,
  onBulkReject,
  selectedUsers,
  setSelectedUsers,
  editingUser,
  isEditModalOpen,
  sortField,
  sortOrder,
  onSort,
}: Props) {
  const selectedRecords = users.filter((user) => selectedUsers.includes(user.id));
  const pendingSelectedCount = selectedRecords.filter(
    (user) => user.role === "STUDENT" && user.status === "PENDING",
  ).length;

  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-foreground text-xl font-semibold">Users</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            {getFilterTabDescription(activeTab)}
          </p>
        </div>

        {activeTab !== "ADMIN" && (
          <MotionButton
            onClick={onOpenFacultyModal}
            className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer rounded-xl px-4 py-2 text-sm font-medium transition self-start"
          >
            Add Faculty
          </MotionButton>
        )}
      </div>

      <UsersTabs activeTab={activeTab} onTabChange={onTabChange} />

      <div className="mt-6">
        <UsersSearch
          value={search}
          onChange={setSearch}
          suggestions={searchSuggestions}
        />
      </div>

      <div className="mt-6">
        <UsersBulkActions
          selectedCount={selectedUsers.length}
          pendingCount={pendingSelectedCount}
          onClear={() => setSelectedUsers([])}
          onApprove={onBulkApprove}
          onReject={onBulkReject}
        />
      </div>

      <div className="relative mt-6">
        {isRefreshing && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-background/40 backdrop-blur-[1px]">
            <div className="bg-card flex items-center gap-2 rounded-full border border-border px-4 py-2 shadow-sm">
              <Loader2 className="text-primary h-4 w-4 animate-spin" />
              <span className="text-muted-foreground text-sm">Updating...</span>
            </div>
          </div>
        )}

        <div
          className={`transition-opacity duration-200 ${
            isRefreshing ? "pointer-events-none opacity-60" : "opacity-100"
          }`}
        >
          <UsersTable
            users={users}
            onEdit={onEditUser}
            onApprove={onApprove}
            onReject={onReject}
            onDisable={onDisable}
            onEnable={onEnable}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={onSort}
          />
        </div>
      </div>

      <div className="mt-6">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      <EditUserModal
        open={isEditModalOpen}
        user={editingUser}
        onOpenChange={(open) => {
          if (!open) onCloseEditModal();
        }}
        onSave={onSaveUser}
        onDisable={onDisable}
        onEnable={onEnable}
      />
    </div>
  );
}
