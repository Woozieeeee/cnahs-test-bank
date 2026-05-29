import Link from "next/link";

import type { Exam } from "@/types/exam";

import SectionExamCard from "./sectionExamsCard";

interface Props {
  exams: Exam[];

  sectionId: number;
}

export default function SectionExamsList({
  exams,
  sectionId,
}: Props) {
  return (
    <div className="space-y-4">
      {exams.map((exam) => (
        <Link
          key={exam.id}
          href={`/admin/academic/sections/${sectionId}/exams/${exam.id}`}
        >
          <SectionExamCard exam={exam} />
        </Link>
      ))}
    </div>
  );
}
