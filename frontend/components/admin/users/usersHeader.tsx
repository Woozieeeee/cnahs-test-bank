import PageHeader from "@/components/layout/pages/pageHeader";

import PageTitle from "@/components/layout/pages/pageTitle";

export default function UsersHeader() {
  return (
    <PageHeader>
      <PageTitle
        title="User Management"
        description="Manage student and faculty accounts."
      />
    </PageHeader>
  );
}
