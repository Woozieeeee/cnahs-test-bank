interface Props {
  metadata: Record<string, unknown>;
}

export default function ActivityDetailsMetadata({
  metadata,
}: Props) {
  return (
    <div className="mt-6">
      <h3 className="font-semibold">Metadata</h3>

      <div
        className="
          mt-2
          space-y-2
          rounded-xl
          bg-slate-100
          p-4
        "
      >
        {Object.entries(metadata).map(([key, value]) => (
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
            <span
              className="
                  font-medium
                  capitalize
                  text-slate-600
                "
            >
              {key}
            </span>

            <span className="text-slate-900">
              {String(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
