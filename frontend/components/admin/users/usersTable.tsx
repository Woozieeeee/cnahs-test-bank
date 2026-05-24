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
}

export default function UsersTable({
  users,

  onApprove,

  onReject,
}: Props) {
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
            <th className="p-4">Name</th>

            <th className="p-4">Student ID</th>

            <th className="p-4">Role</th>

            <th className="p-4">Status</th>

            <th className="p-4">Registered</th>

            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              onApprove={onApprove}
              onReject={onReject}
            />
          ))}

          {users.length === 0 && (
            <tr>
              <td
                colSpan={6}
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
