import BackButton from "@/components/common/backButton";

import PageHeader from "@/components/layout/pages/pageHeader";

import PageTitle from "@/components/layout/pages/pageTitle";

interface Props {
  sectionId: string;

  examId: string;
}

export default function StudentSessionHeader({
  sectionId,
  examId,
}: Props) {
  return (
    <PageHeader>
      <PageTitle
        title="Student Session"
        description="Detailed exam integrity monitoring."
      >
        <BackButton
          href={`/admin/academic/sections/${sectionId}/exams/${examId}/students`}
          label="Back to Sessions"
        />
      </PageTitle>
    </PageHeader>
  );
}
