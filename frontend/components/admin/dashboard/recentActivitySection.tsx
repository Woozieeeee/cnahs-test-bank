interface Activity {
  id: number;

  action: string;

  category: string;

  severity: string;

  description?: string;

  performedBy: string;

  targetUser?: string;

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
    rounded-xl
    border
    border-gray-100
    bg-gray-50
    p-4
    transition
    hover:bg-gray-100
  "
          >
            <div
              className="
      flex
      items-start
      justify-between
      gap-4
    "
            >
              <div>
                <p className="font-medium">
                  {activity.description}
                </p>

                <div
                  className="
          mt-2
          flex
          items-center
          gap-2
          text-sm
          text-gray-500
        "
                >
                  <span>{activity.category}</span>

                  <span>•</span>

                  <span>{activity.severity}</span>

                  {activity.targetUser && (
                    <>
                      <span>•</span>

                      <span>{activity.targetUser}</span>
                    </>
                  )}
                </div>
              </div>

              <p
                className="
        whitespace-nowrap
        text-sm
        text-gray-400
      "
              >
                {new Date(
                  activity.createdAt
                ).toLocaleString()}
              </p>
            </div>
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
