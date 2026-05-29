import PageHeader from "@/components/layout/pages/pageHeader";
import PageTitle from "@/components/layout/pages/pageTitle";

export default function DashboardHeader() {
  return (
    <PageHeader>
      <PageTitle
        title="Welcome back, Admin"
        description="Manage students, approvals, faculty, and
        examinations easily."
      />
    </PageHeader>
  );
}
