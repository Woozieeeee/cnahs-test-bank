import BackButton from "@/components/common/backButton";

export default function SubjectsHeader() {
  return (
    <div>
      <BackButton
        href="/admin/academic"
        label="Back to Academic Management"
      />

      <h1
        className="
          mt-4
          text-3xl
          font-bold
          text-foreground
        "
      >
        Subjects
      </h1>

      <p className="mt-2 text-muted-foreground">
        Manage academic subjects, faculty assignments, and
        section allocations.
      </p>
    </div>
  );
}
