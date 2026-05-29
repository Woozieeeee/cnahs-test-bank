import BackButton from "@/components/common/backButton";
import PageTitle from "@/components/layout/pages/pageTitle";
import PageHeader from "@/components/layout/pages/pageHeader";

interface Props {
  sectionId: string;

  title: string;

  status: string;
}

export default function ExamDetailsHeader({
  sectionId,
  title,
  status,
}: Props) {
  return (
    <PageHeader>
      <PageTitle
        title={title}
        description="Monitor exam sessions, violations, and integrity."
      >
        <BackButton
          href={`/admin/academic/sections/${sectionId}/exams`}
          label="Back to Exams"
        />
      </PageTitle>

      <div
        className="
          rounded-full
          bg-green-100
          px-4
          py-2
          text-sm
          font-medium
          text-green-700
        "
      >
        {status}
      </div>
    </PageHeader>
  );
}
