export default function DashboardHeader() {
  return (
    <div>
      <h1
        className="
          text-3xl
          font-bold
          text-foreground
        "
      >
        Welcome back, Admin
      </h1>

      <p className="mt-2 text-muted-foreground">
        Manage students, approvals, faculty, and
        examinations easily.
      </p>
    </div>
  );
}
