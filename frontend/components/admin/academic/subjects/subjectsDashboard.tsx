import BackButton from "@/components/common/backButton";

export default function SubjectsDashboard() {
  return (
    <div className="space-y-4">
      <BackButton
        href="/admin/academic"
        label="Back to Academic Management"
      />

      <div className="bg-card rounded-2xl p-10 shadow-sm">
        <h2 className="text-foreground text-xl font-semibold">
          Subjects
        </h2>

        <p className="text-muted-foreground mt-2">
          Subject management dashboard coming soon.
        </p>
      </div>
    </div>
  );
}
