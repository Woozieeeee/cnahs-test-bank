import UserTableRow from "./userTableRow";

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
}

export default function UsersTable({
  users,

  onApprove,

  onReject,

  selectedUsers,

  setSelectedUsers,
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
        bg-white
        shadow-sm
      "
    >
      <table className="w-full">
        <thead>
          <tr
            className="
              border-b
              text-left
              text-gray-500
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
                  border-slate-300
                "
              />
            </th>

            {/* HEADERS */}

            <th className="p-4">Name</th>

            <th className="p-4">Student ID</th>

            <th className="p-4">Role</th>

            <th className="p-4">Status</th>

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
                  text-gray-500
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
