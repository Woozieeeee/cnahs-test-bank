import OverviewCard from "./overviewCard";

interface DashboardStats {
  totalStudents: number;

  pendingAccounts: number;

  approvedAccounts: number;

  totalFaculty: number;

  totalExams: number;
}

interface Props {
  stats: DashboardStats;
}

export default function SystemOverviewSection({
  stats,
}: Props) {
  return (
    <div>
      <h2
        className="
          mb-4
          text-xl
          font-semibold
          text-foreground
        "
      >
        System Overview
      </h2>

      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        <OverviewCard
          title="Total Students"
          value={stats.totalStudents}
        />

        <OverviewCard
          title="Pending Accounts"
          value={stats.pendingAccounts}
        />

        <OverviewCard
          title="Total Exams"
          value={stats.totalExams}
        />

        <OverviewCard
          title="Faculty Members"
          value={stats.totalFaculty}
        />
      </div>
    </div>
  );
}
