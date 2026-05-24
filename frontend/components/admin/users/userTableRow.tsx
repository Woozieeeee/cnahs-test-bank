import UserStatusBadge from "./userStatusBadge";
import MotionButton from "@/components/motion/motionButton";

interface Props {
  user: {
    id: number;

    name: string;

    studentId: string;

    role: string;

    status: string;

    createdAt: string;
  };

  onApprove: (id: number) => Promise<void>;

  onReject: (id: number) => Promise<void>;
}

export default function UserTableRow({
  user,

  onApprove,

  onReject,
}: Props) {
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

      {/* ACTIONS */}

      <td className="p-3">
        <div className="flex gap-2">
          {user.status === "PENDING" && (
            <>
              <MotionButton
                onClick={() => onApprove(user.id)}
                className="
                  rounded-lg
                  bg-green-500
                  px-3
                  py-1
                  text-sm
                  text-white
                  transition
                  hover:bg-green-600
                "
              >
                Approve
              </MotionButton>

              <MotionButton
                onClick={() => onReject(user.id)}
                className="
                  rounded-lg
                  bg-red-500
                  px-3
                  py-1
                  text-sm
                  text-white
                  transition
                  hover:bg-red-600
                "
              >
                Reject
              </MotionButton>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
