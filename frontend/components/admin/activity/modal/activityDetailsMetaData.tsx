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
          bg-muted
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
                border-border
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
                  text-muted-foreground
                "
            >
              {key}
            </span>

            <span className="text-foreground">
              {String(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
