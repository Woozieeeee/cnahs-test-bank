"use client";

import { memo } from "react";
import {
  Ban,
  CheckCircle,
  ChevronDown,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { confirmDialog } from "@/lib/swal";
import type { ManagedUser } from "@/hooks/admin/users/useUserActions";

interface UserActionsMenuProps {
  user: ManagedUser;
  onEdit: (user: ManagedUser) => void;
  onApprove: (id: number) => Promise<void>;
  onReject: (id: number) => Promise<void>;
  onDisable: (id: number, userName: string) => Promise<void>;
  onEnable: (id: number, userName: string) => Promise<void>;
}

function UserActionsMenu({
  user,
  onEdit,
  onApprove,
  onReject,
  onDisable,
  onEnable,
}: UserActionsMenuProps) {
  const canModerate = user.role === "STUDENT" && user.status === "PENDING";
  const canDisable =
    user.role !== "ADMIN" &&
    user.status !== "DISABLED" &&
    user.status !== "REJECTED";
  const canEnable =
    user.role !== "ADMIN" &&
    (user.status === "DISABLED" || user.status === "REJECTED");

  const handleApprove = async () => {
    const result = await confirmDialog({
      title: "Approve Student",
      text: `Approve ${user.name}'s registration?`,
      confirmText: "Approve",
      cancelText: "Cancel",
      destructive: false,
    });

    if (result.isConfirmed) {
      await onApprove(user.id);
    }
  };

  const handleReject = async () => {
    const result = await confirmDialog({
      title: "Reject Student",
      text: `Reject ${user.name}'s registration?`,
      confirmText: "Reject",
      cancelText: "Cancel",
      destructive: true,
    });

    if (result.isConfirmed) {
      await onReject(user.id);
    }
  };

  return (
    <div className="inline-flex items-stretch rounded-lg border border-border shadow-xs">
      <Button
        variant="outline"
        size="sm"
        className="rounded-r-none border-0 px-3"
        onClick={() => onEdit(user)}
      >
        Edit
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="rounded-l-none border-0 border-l border-border px-2"
            aria-label={`More actions for ${user.name}`}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {canModerate && (
            <>
              <DropdownMenuItem onClick={() => void handleApprove()}>
                <CheckCircle className="h-4 w-4" />
                Approve
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onClick={() => void handleReject()}>
                <XCircle className="h-4 w-4" />
                Reject
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          {canDisable && (
            <DropdownMenuItem
              variant="destructive"
              onClick={() => void onDisable(user.id, user.name)}
            >
              <Ban className="h-4 w-4" />
              Disable Account
            </DropdownMenuItem>
          )}

          {canEnable && (
            <DropdownMenuItem onClick={() => void onEnable(user.id, user.name)}>
              <ShieldCheck className="h-4 w-4" />
              Enable Account
            </DropdownMenuItem>
          )}

          {!canModerate && !canDisable && !canEnable && (
            <DropdownMenuItem disabled>No quick actions</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default memo(UserActionsMenu);
