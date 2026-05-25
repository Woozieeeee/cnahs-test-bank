import ActivitySeverityBadge from "./activitySeverityBadge";

interface Activity {
  id: number;

  action: string;

  category: string;

  severity: string;

  description?: string;

  performedBy: string;

  targetUser?: string;

  createdAt: string;

  metadata?: any;
}

interface Props {
  activity: Activity | null;

  onClose: () => void;
}

export default function ActivityDetailsModal({
  activity,

  onClose,
}: Props) {
  if (!activity) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          rounded-2xl
          bg-white
          p-6
          shadow-xl
        "
      >
        {/* HEADER */}

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ActivitySeverityBadge
                severity={activity.severity}
              />

              <span
                className="
          rounded-md
          bg-slate-100
          px-2
          py-1
          text-xs
          font-medium
          text-slate-600
        "
              >
                {activity.category}
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-bold">
              {activity.action}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {new Date(
                activity.createdAt
              ).toLocaleString()}
            </p>
          </div>

          <button
            onClick={onClose}
            className="
            rounded-lg
            px-3
            py-1
            text-slate-500
            transition
            hover:bg-slate-100
            hover:text-slate-900
            "
          >
            ✕
          </button>
        </div>

        {/* DETAILS */}

        <div
          className="
            mt-6
            grid
            gap-4
            md:grid-cols-2
          "
        >
          <DetailItem
            label="Category"
            value={activity.category}
          />

          <DetailItem
            label="Severity"
            value={activity.severity}
          />

          <DetailItem
            label="Performed By"
            value={activity.performedBy}
          />

          <DetailItem
            label="Target User"
            value={activity.targetUser || "N/A"}
          />

          <DetailItem
            label="Timestamp"
            value={new Date(
              activity.createdAt
            ).toLocaleString()}
          />
        </div>

        {/* DESCRIPTION */}

        {activity.description && (
          <div className="mt-6">
            <h3 className="font-semibold">Description</h3>

            <p className="mt-2 text-slate-600">
              {activity.description}
            </p>
          </div>
        )}

        {/* METADATA */}

        {activity.metadata && (
          <div
            className="
    mt-2
    space-y-2
    rounded-xl
    bg-slate-100
    p-4
  "
          >
            {Object.entries(activity.metadata).map(
              ([key, value]) => (
                <div
                  key={key}
                  className="
          flex
          items-center
          justify-between
          gap-4
          border-b
          border-slate-200
          pb-2
          text-sm
          last:border-0
          last:pb-0
        "
                >
                  <span className="font-medium capitalize text-slate-600">
                    {key}
                  </span>

                  <span className="text-slate-900">
                    {String(value)}
                  </span>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function DetailItem({
  label,

  value,
}: {
  label: string;

  value: string;
}) {
  return (
    <div
      className="
        rounded-xl
        bg-slate-50
        p-4
      "
    >
      <p
        className="
          text-sm
          text-slate-500
        "
      >
        {label}
      </p>

      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}
