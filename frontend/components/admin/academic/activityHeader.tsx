import PageHeader from "@/components/layout/pages/pageHeader";

import PageTitle from "@/components/layout/pages/pageTitle";

export default function ActivityHeader() {
  return (
    <PageHeader>
      <PageTitle
        title="Activity Logs"
        description="Monitor recent administrative actions, violations, approvals, and system events."
      />
    </PageHeader>
  );
}
