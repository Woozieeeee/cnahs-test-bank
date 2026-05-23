interface Activity {
  id: number;

  message: string;

  createdAt: string;
}

interface Props {
  activities: Activity[];
}

export default function RecentActivitySection({
  activities,
}: Props) {
  return (
    <div
      className="
        rounded-2xl
        bg-white
        p-6
        shadow-sm
      "
    >
      <h2
        className="
          mb-4
          text-xl
          font-semibold
        "
      >
        Recent Activity
      </h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="
                rounded-lg
                bg-gray-50
                p-4
              "
          >
            <p>{activity.message}</p>

            <p
              className="
                  mt-1
                  text-sm
                  text-gray-500
                "
            >
              {new Date(
                activity.createdAt
              ).toLocaleString()}
            </p>
          </div>
        ))}

        {activities.length === 0 && (
          <div
            className="
              rounded-lg
              bg-gray-50
              p-4
              text-gray-500
            "
          >
            No recent activity found.
          </div>
        )}
      </div>
    </div>
  );
}
