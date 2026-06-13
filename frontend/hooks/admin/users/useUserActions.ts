"use client";

import { useCallback } from "react";
import {
  approveStudent,
  rejectStudent,
  updateAdminUser,
} from "@/services/admin_service";
import { confirmDialog, successToast, errorToast } from "@/lib/swal";

export interface ManagedUser {
  id: number;
  name: string;
  studentId: string;
  username?: string;
  role: string;
  status: string;
  createdAt: string;
}

export const useUserActions = (
  setUsers: React.Dispatch<React.SetStateAction<ManagedUser[]>>,
) => {
  const patchUser = useCallback(
    (userId: number, patch: Partial<ManagedUser>) => {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, ...patch } : user,
        ),
      );
    },
    [setUsers],
  );

  const approveUser = useCallback(
    async (userId: number) => {
      try {
        await approveStudent(userId);
        successToast("Student approved successfully.");
        patchUser(userId, { status: "APPROVED" });
      } catch {
        errorToast("Failed to approve student.");
      }
    },
    [patchUser],
  );

  const rejectUser = useCallback(
    async (userId: number) => {
      try {
        await rejectStudent(userId);
        successToast("Student rejected successfully.");
        patchUser(userId, { status: "REJECTED" });
      } catch {
        errorToast("Failed to reject student.");
      }
    },
    [patchUser],
  );

  const disableUser = useCallback(
    async (userId: number, userName: string) => {
      const result = await confirmDialog({
        title: "Disable Account",
        text: `Disable ${userName}'s account? They will not be able to sign in.`,
        confirmText: "Disable",
        cancelText: "Cancel",
        destructive: true,
      });

      if (!result.isConfirmed) return;

      try {
        await updateAdminUser(userId, { status: "DISABLED" });
        successToast("Account disabled.");
        patchUser(userId, { status: "DISABLED" });
      } catch (error: unknown) {
        const message =
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Failed to disable account.";
        errorToast(message);
      }
    },
    [patchUser],
  );

  const enableUser = useCallback(
    async (userId: number, userName: string) => {
      const result = await confirmDialog({
        title: "Enable Account",
        text: `Restore access for ${userName}?`,
        confirmText: "Enable",
        cancelText: "Cancel",
        destructive: false,
      });

      if (!result.isConfirmed) return;

      try {
        await updateAdminUser(userId, { status: "APPROVED" });
        successToast("Account enabled.");
        patchUser(userId, { status: "APPROVED" });
      } catch (error: unknown) {
        const message =
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Failed to enable account.";
        errorToast(message);
      }
    },
    [patchUser],
  );

  const updateUserProfile = useCallback(
    async (
      userId: number,
      data: {
        name?: string;
        username?: string;
        password?: string;
      },
    ) => {
      const response = await updateAdminUser(userId, data);
      const updated = response.user;

      patchUser(userId, {
        name: updated.name,
        username: updated.username ?? undefined,
        studentId: updated.studentId ?? "",
        status: updated.status,
      });

      return updated;
    },
    [patchUser],
  );

  const bulkApprovePending = useCallback(
    async (users: ManagedUser[]) => {
      const pending = users.filter(
        (user) => user.role === "STUDENT" && user.status === "PENDING",
      );

      if (pending.length === 0) return;

      const result = await confirmDialog({
        title: "Approve Selected",
        text: `Approve ${pending.length} pending student account(s)?`,
        confirmText: "Approve All",
        cancelText: "Cancel",
        destructive: false,
      });

      if (!result.isConfirmed) return;

      const results = await Promise.allSettled(
        pending.map((user) => approveStudent(user.id)),
      );

      const succeeded = results.filter((r) => r.status === "fulfilled").length;

      pending.forEach((user) => patchUser(user.id, { status: "APPROVED" }));

      if (succeeded === pending.length) {
        successToast(`${succeeded} student(s) approved.`);
      } else {
        errorToast(`Approved ${succeeded} of ${pending.length} student(s).`);
      }
    },
    [patchUser],
  );

  const bulkRejectPending = useCallback(
    async (users: ManagedUser[]) => {
      const pending = users.filter(
        (user) => user.role === "STUDENT" && user.status === "PENDING",
      );

      if (pending.length === 0) return;

      const result = await confirmDialog({
        title: "Reject Selected",
        text: `Reject ${pending.length} pending student account(s)?`,
        confirmText: "Reject All",
        cancelText: "Cancel",
        destructive: true,
      });

      if (!result.isConfirmed) return;

      const results = await Promise.allSettled(
        pending.map((user) => rejectStudent(user.id)),
      );

      const succeeded = results.filter((r) => r.status === "fulfilled").length;

      pending.forEach((user) => patchUser(user.id, { status: "REJECTED" }));

      if (succeeded === pending.length) {
        successToast(`${succeeded} student(s) rejected.`);
      } else {
        errorToast(`Rejected ${succeeded} of ${pending.length} student(s).`);
      }
    },
    [patchUser],
  );

  return {
    approveUser,
    rejectUser,
    disableUser,
    enableUser,
    updateUserProfile,
    bulkApprovePending,
    bulkRejectPending,
  };
};
