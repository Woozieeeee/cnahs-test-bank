interface Props {
  metadata: Record<string, unknown>;
}

export default function ActivityDetailsMetadata({
  metadata,
}: Props) {
  return (
    <div className="mt-6">
      <h3 className="font-semibold">Metadata</h3>

      <div className="bg-muted mt-2 space-y-2 rounded-xl p-4">
        {Object.entries(metadata).map(([key, value]) => (
          <div
            key={key}
            className="border-border flex items-center justify-between gap-4 border-b pb-2 text-sm last:border-0 last:pb-0"
          >
            <span className="text-muted-foreground font-medium capitalize">
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
