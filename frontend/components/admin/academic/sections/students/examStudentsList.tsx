import ExamStudentCard from "./examStudentCard";

interface Props {
  students: any[];

  sectionId: string;

  examId: string;
}

export default function ExamStudentsList({
  students,
  sectionId,
  examId,
}: Props) {
  return (
    <div className="space-y-4">
      {students.map((student) => (
        <ExamStudentCard
          key={student.id}
          student={student}
          sectionId={sectionId}
          examId={examId}
        />
      ))}
    </div>
  );
}
