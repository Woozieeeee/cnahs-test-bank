import BackButton from "@/components/common/backButton";
import PageHeader from "@/components/layout/pages/pageHeader";
import PageTitle from "@/components/layout/pages/pageTitle";

export default function SubjectsHeader() {
  return (
    <PageHeader>
      <PageTitle
        title="Subjects"
        description="Manage academic subjects, faculty assignments, and
        section allocations."
      >
        <BackButton
          href="/admin/academic"
          label="Back to Academic Management"
        />
      </PageTitle>
    </PageHeader>
  );
}
