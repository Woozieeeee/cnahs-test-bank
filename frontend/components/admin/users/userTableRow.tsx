import UserStatusBadge from "./userStatusBadge";

interface Props {
  user: {
    id: number;

    name: string;

    studentId: string;

    role: string;

    status: string;

    createdAt: string;
  };
}

export default function UserTableRow({ user }: Props) {
  return (
    <tr className="border-b">
      <td className="p-3">{user.name}</td>

      <td className="p-3">{user.studentId}</td>

      <td className="p-3">{user.role}</td>

      <td className="p-3">
        <UserStatusBadge status={user.status} />
      </td>

      <td className="p-3">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
    </tr>
  );
}
