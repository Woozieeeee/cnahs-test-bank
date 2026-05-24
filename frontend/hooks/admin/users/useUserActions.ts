import {
  approveStudent,
  rejectStudent,
} from "@/services/admin_service";

import { successToast, errorToast } from "@/lib/swal";

export const useUserActions = (setUsers: any) => {
  const approveUser = async (userId: number) => {
    try {
      await approveStudent(userId);

      successToast("Student approved successfully.");

      setUsers((prev: any[]) =>
        prev.map((user) =>
          user.id === userId
            ? {
                ...user,

                status: "APPROVED",
              }
            : user
        )
      );
    } catch (error) {
      errorToast("Failed to approve student.");
    }
  };

  const rejectUser = async (userId: number) => {
    try {
      await rejectStudent(userId);

      successToast("Student rejected successfully.");

      setUsers((prev: any[]) =>
        prev.map((user) =>
          user.id === userId
            ? {
                ...user,

                status: "REJECTED",
              }
            : user
        )
      );
    } catch (error) {
      errorToast("Failed to reject student.");
    }
  };

  return {
    approveUser,

    rejectUser,
  };
};
