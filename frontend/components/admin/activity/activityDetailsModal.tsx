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

        <div
          className="
            flex
            items-start
            justify-between
          "
        >
          <div>
            <h2
              className="
                text-2xl
                font-bold
              "
            >
              {activity.action}
            </h2>

            <p className="mt-1 text-slate-500">
              Activity details and metadata
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              rounded-lg
              px-3
              py-1
              hover:bg-slate-100
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
          <div className="mt-6">
            <h3 className="font-semibold">Metadata</h3>

            <pre
              className="
                mt-2
                overflow-auto
                rounded-xl
                bg-slate-100
                p-4
                text-sm
              "
            >
              {JSON.stringify(activity.metadata, null, 2)}
            </pre>
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
