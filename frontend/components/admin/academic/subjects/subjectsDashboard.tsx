import BackButton from "@/components/common/backButton";

export default function SubjectsDashboard() {
  return (
    <div className="space-y-4">
      <BackButton
        href="/admin/academic"
        label="Back to Academic Management"
      />

      <div
        className="
          rounded-2xl
          bg-card
          p-10
          shadow-sm
        "
      >
        <h2
          className="
            text-xl
            font-semibold
            text-foreground
          "
        >
          Subjects
        </h2>

        <p className="mt-2 text-muted-foreground">
          Subject management dashboard coming soon.
        </p>
      </div>
    </div>
  );
}
