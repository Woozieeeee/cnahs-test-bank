import { memo } from "react";
import UserActionsMenu from "./userActionsMenu";
import type { ManagedUser } from "@/hooks/admin/users/useUserActions";

interface Props {
  user: ManagedUser;
  onEdit: (user: ManagedUser) => void;
  onApprove: (id: number) => Promise<void>;
  onReject: (id: number) => Promise<void>;
  onDisable: (id: number, userName: string) => Promise<void>;
  onEnable: (id: number, userName: string) => Promise<void>;
  selected: boolean;
  onSelect: () => void;
}

function UserTableRow({
  user,
  onEdit,
  onApprove,
  onReject,
  onDisable,
  onEnable,
  selected,
  onSelect,
}: Props) {
  return (
    <tr className="hover:bg-muted/50 border-b transition">
      <td className="p-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          className="border-input h-4 w-4 rounded"
        />
      </td>

      <td className="text-foreground p-4 font-medium">{user.name}</td>

      <td className="text-muted-foreground p-4">
        {user.studentId || user.username || "—"}
      </td>

      <td className="text-muted-foreground p-4">{user.role}</td>

      <td className="p-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            user.status === "APPROVED"
              ? "bg-emerald-100 text-emerald-700"
              : user.status === "PENDING"
                ? "bg-yellow-100 text-yellow-700"
                : user.status === "DISABLED"
                  ? "bg-slate-100 text-slate-700"
                  : "bg-red-100 text-red-700"
          }`}
        >
          {user.status}
        </span>
      </td>

      <td className="text-muted-foreground p-4">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>

      <td className="p-4 text-right">
        <UserActionsMenu
          user={user}
          onEdit={onEdit}
          onApprove={onApprove}
          onReject={onReject}
          onDisable={onDisable}
          onEnable={onEnable}
        />
      </td>
    </tr>
  );
}

export default memo(UserTableRow);
