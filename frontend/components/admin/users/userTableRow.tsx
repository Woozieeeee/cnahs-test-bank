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
    <tr
      className="
        border-b
        transition
        hover:bg-slate-50
      "
    >
      {/* CHECKBOX */}

      <td className="p-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          className="
            h-4
            w-4
            rounded
            border-slate-300
          "
        />
      </td>

      {/* NAME */}

      <td className="p-4 font-medium text-slate-800">
        {user.name}
      </td>

      {/* STUDENT ID */}

      <td className="p-4 text-slate-600">
        {user.studentId}
      </td>

      {/* ROLE */}

      <td className="p-4 text-slate-600">{user.role}</td>

      {/* STATUS */}

      <td className="p-4">
        <span
          className={`
            rounded-full
            px-3
            py-1
            text-xs
            font-medium

            ${
              user.status === "APPROVED"
                ? "bg-emerald-100 text-emerald-700"
                : user.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
            }
          `}
        >
          {user.status}
        </span>
      </td>

      {/* CREATED */}

      <td className="p-4 text-slate-600">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>

      {/* ACTIONS */}

      <td className="p-4">
        <div className="flex gap-2">
          <button
            onClick={() => onApprove(user.id)}
            className="
              rounded-lg
              bg-emerald-600
              px-3
              py-2
              text-sm
              font-medium
              text-white
              transition
              hover:bg-emerald-700
            "
          >
            Approve
          </button>

          <button
            onClick={() => onReject(user.id)}
            className="
              rounded-lg
              bg-red-600
              px-3
              py-2
              text-sm
              font-medium
              text-white
              transition
              hover:bg-red-700
            "
          >
            Reject
          </button>
        </div>
      </td>
    </tr>
  );
}
