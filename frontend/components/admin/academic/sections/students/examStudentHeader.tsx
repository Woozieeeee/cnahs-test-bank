import BackButton from "@/components/common/backButton";

import PageHeader from "@/components/layout/pages/pageHeader";

import PageTitle from "@/components/layout/pages/pageTitle";

interface Props {
  sectionId: string;

  examId: string;
}

export default function ExamStudentsHeader({
  sectionId,
  examId,
}: Props) {
  return (
    <PageHeader>
      <PageTitle
        title="Exam Sessions"
        description="Monitor all active and completed student exam sessions."
      >
        <BackButton
          href={`/admin/academic/sections/${sectionId}/exams/${examId}`}
          label="Back to Exam"
        />
      </PageTitle>
    </PageHeader>
  );
}
