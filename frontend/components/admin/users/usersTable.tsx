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
}

export default function UsersTable({ users }: Props) {
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
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <UserTableRow key={user.id} user={user} />
          ))}

          {users.length === 0 && (
            <tr>
              <td
                colSpan={5}
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
