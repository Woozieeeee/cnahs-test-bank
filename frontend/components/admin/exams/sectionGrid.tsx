import { useState } from "react";
import SectionCard from "./sectionCard";
import ViolationsModal from "./violationsModal";

interface Section {
  id: number;
  name: string;
  code: string;
  program: string;
  yearLevel: number;
  totalStudents: number;
  activeStudents: number;
  exams: Array<{
    id: number;
    title: string;
    code: string;
    subject: string;
    status: string;
    difficulty: string;
    startsAt: string | null;
    endsAt: string | null;
    totalQuestions: number;
    totalAttempts: number;
    totalViolations: number;
    unresolvedViolations: number;
  }>;
  violations: {
    total: number;
    unresolved: number;
    resolved: number;
    bySeverity: {
      LOW: number;
      MEDIUM: number;
      HIGH: number;
    };
  };
}

interface Props {
  sections: Section[];
}

export default function SectionGrid({ sections }: Props) {
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);
  const [showViolations, setShowViolations] = useState(false);

  const handleViewViolations = (examId: number) => {
    setSelectedExamId(examId);
    setShowViolations(true);
  };

  if (!sections || sections.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No sections with exams found
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            onViewViolations={handleViewViolations}
          />
        ))}
      </div>

      {showViolations && selectedExamId && (
        <ViolationsModal
          examId={selectedExamId}
          isOpen={showViolations}
          onClose={() => setShowViolations(false)}
        />
      )}
    </>
  );
}
