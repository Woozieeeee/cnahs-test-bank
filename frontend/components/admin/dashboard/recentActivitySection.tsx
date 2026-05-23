export default function RecentActivitySection() {
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
        <div
          className="
            rounded-lg
            bg-gray-50
            p-4
          "
        >
          John Doe registered for an account.
        </div>

        <div
          className="
            rounded-lg
            bg-gray-50
            p-4
          "
        >
          Pharmacology Exam was created.
        </div>

        <div
          className="
            rounded-lg
            bg-gray-50
            p-4
          "
        >
          5 student accounts were approved today.
        </div>
      </div>
    </div>
  );
}
