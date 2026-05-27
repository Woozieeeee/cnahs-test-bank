import UserTableRow from "./userTableRow";
import SortableTableHeader from "@/components/common/sortableTableHeader";

interface User {
  id: number;

  name: string;

  studentId: string;

  role: string;

  status: string;

  createdAt: string;
}

interface Props {
  users: User[];

  onApprove: (id: number) => Promise<void>;

  onReject: (id: number) => Promise<void>;

  selectedUsers: number[];

  setSelectedUsers: React.Dispatch<
    React.SetStateAction<number[]>
  >;

  sortField: string;

  sortOrder: "asc" | "desc";

  onSort: (
    field: string,

    order: "asc" | "desc"
  ) => void;
}

export default function UsersTable({
  users,

  onApprove,

  onReject,

  selectedUsers,

  setSelectedUsers,

  sortField,

  sortOrder,

  onSort,
}: Props) {
  // =========================
  // SELECT ALL
  // =========================

  const allSelected =
    users.length > 0 &&
    users.every((user) => selectedUsers.includes(user.id));

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  // =========================
  // SELECT SINGLE USER
  // =========================

  const handleSelectUser = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id)
        ? prev.filter((userId) => userId !== id)
        : [...prev, id]
    );
  };

  return (
    <div
      className="
        overflow-x-auto
        rounded-2xl
        bg-card
        shadow-sm
      "
    >
      <table className="w-full">
        <thead>
          <tr
            className="
              border-b
              text-left
              text-muted-foreground
            "
          >
            {/* CHECKBOX */}

            <th className="p-4">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
                className="
                  h-4
                  w-4
                  rounded
                  border-input
                "
              />
            </th>

            {/* HEADERS */}

            <SortableTableHeader
              label="Name"
              field="name"
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={onSort}
            />

            <SortableTableHeader
              label="Student ID"
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

            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {/* USERS */}

          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              onApprove={onApprove}
              onReject={onReject}
              selected={selectedUsers.includes(user.id)}
              onSelect={() => handleSelectUser(user.id)}
            />
          ))}

          {/* EMPTY STATE */}

          {users.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="
                  p-6
                  text-center
                  text-muted-foreground
                "
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
