export default function ActivityTimelineLoading() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="
            animate-pulse
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            p-5
          "
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="h-4 w-48 rounded bg-slate-200" />

              <div className="h-3 w-full rounded bg-slate-100" />

              <div className="h-3 w-2/3 rounded bg-slate-100" />
            </div>

            <div className="h-6 w-20 rounded-full bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
