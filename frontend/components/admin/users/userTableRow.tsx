interface User {
  id: number;

  name: string;

  studentId: string;

  role: string;

  status: string;

  createdAt: string;
}

interface Props {
  user: User;

  onApprove: (id: number) => Promise<void>;

  onReject: (id: number) => Promise<void>;

  selected: boolean;

  onSelect: () => void;
}

export default function UserTableRow({
  user,

  onApprove,

  onReject,

  selected,

  onSelect,
}: Props) {
  return (
    <tr className="hover:bg-muted/50 border-b transition">
      {/* CHECKBOX */}

      <td className="p-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          className="border-input h-4 w-4 rounded"
        />
      </td>

      {/* NAME */}

      <td className="text-foreground p-4 font-medium">
        {user.name}
      </td>

      {/* STUDENT ID */}

      <td className="text-muted-foreground p-4">
        {user.studentId}
      </td>

      {/* ROLE */}

      <td className="text-muted-foreground p-4">
        {user.role}
      </td>

      {/* STATUS */}

      <td className="p-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            user.status === "APPROVED"
              ? "bg-emerald-100 text-emerald-700"
              : user.status === "PENDING"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
          } `}
        >
          {user.status}
        </span>
      </td>

      {/* CREATED */}

      <td className="text-muted-foreground p-4">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>

      {/* ACTIONS */}

      <td className="p-4">
        {user.role === "STUDENT" &&
        user.status === "PENDING" ? (
          <div className="flex gap-2">
            <button
              onClick={() => onApprove(user.id)}
              className="cursor-pointer rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Approve
            </button>

            <button
              onClick={() => onReject(user.id)}
              className="cursor-pointer rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        ) : (
          <span className="text-muted-foreground text-sm">
            —
          </span>
        )}
      </td>
    </tr>
  );
}
