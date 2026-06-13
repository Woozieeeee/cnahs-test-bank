"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getUsers } from "@/services/admin_service";
import UsersLoader from "@/components/admin/users/usersLoader";
import UsersStatsBar from "@/components/admin/users/usersStatsBar";
import UsersManagementTable from "@/components/admin/users/usersManagementTable";
import {
  useUserActions,
  type ManagedUser,
} from "@/hooks/admin/users/useUserActions";
import AnimatedPage from "@/components/common/animatedPage";
import AddFacultyModal from "@/components/admin/users/addFacultyModal";
import PageContainer from "@/components/layout/pages/pageContainer";
import UsersHeader from "@/components/admin/users/usersHeader";
import UsersTabs, {
  type UserFilterTab,
  filterTabToQuery,
} from "@/components/admin/users/usersTabs";

const ROLE_ORDER: Record<string, number> = {
  STUDENT: 0,
  FACULTY: 1,
  ADMIN: 2,
};

const SEARCH_DEBOUNCE_MS = 300;

function buildSearchSuggestions(users: ManagedUser[]): string[] {
  const suggestions = new Set<string>();

  for (const user of users) {
    if (user.name?.trim()) suggestions.add(user.name.trim());
    if (user.studentId?.trim()) suggestions.add(user.studentId.trim());
    if (user.username?.trim()) suggestions.add(user.username.trim());
  }

  return Array.from(suggestions).sort((a, b) => a.localeCompare(b));
}

export default function UsersPage() {
  const [filterTab, setFilterTab] = useState<UserFilterTab>("ALL");
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openFacultyModal, setOpenFacultyModal] = useState(false);
  const [editingUser, setEditingUser] = useState<ManagedUser | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const hasLoadedOnce = useRef(false);

  const {
    approveUser,
    rejectUser,
    disableUser,
    enableUser,
    updateUserProfile,
    bulkApprovePending,
    bulkRejectPending,
  } = useUserActions(setUsers);

  const { role, status } = filterTabToQuery(filterTab);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [search]);

  const fetchUsers = useCallback(async () => {
    const showInitialLoader = !hasLoadedOnce.current;

    try {
      if (showInitialLoader) {
        setInitialLoading(true);
      } else {
        setIsRefreshing(true);
      }

      const data = await getUsers({
        page,
        limit: 10,
        search: debouncedSearch,
        role,
        status,
      });

      setUsers(data.users);
      setTotalPages(data.totalPages);
      hasLoadedOnce.current = true;
    } catch (error) {
      console.error(error);
    } finally {
      setInitialLoading(false);
      setIsRefreshing(false);
    }
  }, [page, debouncedSearch, role, status]);

  const fetchSearchSuggestions = useCallback(async () => {
    try {
      const data = await getUsers({
        page: 1,
        limit: 250,
        search: "",
        role: "ALL",
        status: "ALL",
      });

      setSearchSuggestions(buildSearchSuggestions(data.users));
    } catch {
      // Keep existing suggestions on failure
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchSearchSuggestions();
  }, [fetchSearchSuggestions]);

  const handleFilterTabChange = (tab: UserFilterTab) => {
    setFilterTab(tab);
    setPage(1);
    setSelectedUsers([]);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
    setSelectedUsers([]);
  };

  const handleEditUser = (user: ManagedUser) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  const handleSaveUser = async (
    userId: number,
    data: { name?: string; username?: string; password?: string },
  ) => {
    await updateUserProfile(userId, data);
    if (editingUser?.id === userId) {
      setEditingUser((prev) =>
        prev
          ? {
              ...prev,
              name: data.name ?? prev.name,
              username: data.username ?? prev.username,
            }
          : prev,
      );
    }
  };

  const selectedRecords = useMemo(
    () => users.filter((user) => selectedUsers.includes(user.id)),
    [users, selectedUsers],
  );

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      if (filterTab === "ALL" && sortField === "createdAt") {
        const roleDiff = (ROLE_ORDER[a.role] ?? 99) - (ROLE_ORDER[b.role] ?? 99);
        if (roleDiff !== 0) {
          return sortOrder === "asc" ? -roleDiff : roleDiff;
        }
      }

      const aValue = String(a[sortField as keyof ManagedUser] || "").toLowerCase();
      const bValue = String(b[sortField as keyof ManagedUser] || "").toLowerCase();

      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      }

      return bValue.localeCompare(aValue);
    });
  }, [users, sortField, sortOrder, filterTab]);

  if (initialLoading && users.length === 0) {
    return <UsersLoader />;
  }

  return (
    <AnimatedPage>
      <PageContainer>
        <UsersHeader />

        <UsersStatsBar
          total={users.length}
          pending={users.filter((u) => u.status === "PENDING").length}
          approved={users.filter((u) => u.status === "APPROVED").length}
          rejected={users.filter((u) => u.status === "REJECTED").length}
        />

        <UsersManagementTable
          users={sortedUsers}
          activeTab={filterTab}
          onTabChange={handleFilterTabChange}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          isRefreshing={isRefreshing}
          onApprove={approveUser}
          onReject={rejectUser}
          onDisable={disableUser}
          onEnable={enableUser}
          onEditUser={handleEditUser}
          onCloseEditModal={handleCloseEditModal}
          onSaveUser={handleSaveUser}
          onBulkApprove={() => {
            void bulkApprovePending(selectedRecords).then(() =>
              setSelectedUsers([]),
            );
          }}
          onBulkReject={() => {
            void bulkRejectPending(selectedRecords).then(() =>
              setSelectedUsers([]),
            );
          }}
          search={search}
          setSearch={handleSearchChange}
          searchSuggestions={searchSuggestions}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          editingUser={editingUser}
          isEditModalOpen={isEditModalOpen}
          onOpenFacultyModal={() => setOpenFacultyModal(true)}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={(field, order) => {
            setSortField(field);
            setSortOrder(order);
          }}
        />
      </PageContainer>

      <AddFacultyModal
        open={openFacultyModal}
        onOpenChange={setOpenFacultyModal}
        onSuccess={() => {
          fetchUsers();
          fetchSearchSuggestions();
        }}
      />
    </AnimatedPage>
  );
}
