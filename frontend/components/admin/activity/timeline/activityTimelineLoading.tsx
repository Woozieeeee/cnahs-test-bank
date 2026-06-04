export default function ActivityTimelineLoading() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="border-border bg-muted/20 animate-pulse rounded-xl border p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="bg-muted h-4 w-48 rounded" />

              <div className="bg-muted/70 h-3 w-full rounded" />

              <div className="bg-muted/70 h-3 w-2/3 rounded" />
            </div>

            <div className="bg-muted h-6 w-20 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
