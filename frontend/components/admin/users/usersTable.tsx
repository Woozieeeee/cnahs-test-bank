import UserTableRow from "./userTableRow";
import SortableTableHeader from "@/components/common/sortableTableHeader";
import type { ManagedUser } from "@/hooks/admin/users/useUserActions";

interface Props {
  users: ManagedUser[];
  onEdit: (user: ManagedUser) => void;
  onApprove: (id: number) => Promise<void>;
  onReject: (id: number) => Promise<void>;
  onDisable: (id: number, userName: string) => Promise<void>;
  onEnable: (id: number, userName: string) => Promise<void>;
  selectedUsers: number[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<number[]>>;
  sortField: string;
  sortOrder: "asc" | "desc";
  onSort: (field: string, order: "asc" | "desc") => void;
}

export default function UsersTable({
  users,
  onEdit,
  onApprove,
  onReject,
  onDisable,
  onEnable,
  selectedUsers,
  setSelectedUsers,
  sortField,
  sortOrder,
  onSort,
}: Props) {
  const allSelected =
    users.length > 0 && users.every((user) => selectedUsers.includes(user.id));

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  const handleSelectUser = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id],
    );
  };

  return (
    <div className="bg-card overflow-x-auto rounded-2xl shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="text-muted-foreground border-b text-left">
            <th className="p-4">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
                className="border-input h-4 w-4 rounded"
              />
            </th>

            <SortableTableHeader
              label="Name"
              field="name"
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={onSort}
            />

            <SortableTableHeader
              label="ID / Username"
              field="studentId"
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={onSort}
            />

            <SortableTableHeader
              label="Role"
              field="role"
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={onSort}
            />

            <SortableTableHeader
              label="Status"
              field="status"
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={onSort}
            />

            <th className="p-4">Registered</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              onEdit={onEdit}
              onApprove={onApprove}
              onReject={onReject}
              onDisable={onDisable}
              onEnable={onEnable}
              selected={selectedUsers.includes(user.id)}
              onSelect={() => handleSelectUser(user.id)}
            />
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan={7} className="text-muted-foreground p-6 text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
