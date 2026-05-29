import Link from "next/link";
import BackButton from "@/components/common/backButton";
import { ArrowLeft } from "lucide-react";
import PageTitle from "@/components/layout/pages/pageTitle";
import PageHeader from "@/components/layout/pages/pageHeader";

export default function StudentRecordsHeader() {
  return (
    <PageHeader>
      <PageTitle
        title="Student Records"
        description="Manage official student verification records. "
      >
        <BackButton
          href="/admin/academic"
          label="Back to Academic Management"
        />
      </PageTitle>
    </PageHeader>
  );
}
