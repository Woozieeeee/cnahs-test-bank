"use client";

import ModalHeader from "@/components/common/modal/modalHeader";
import MotionModal from "@/components/motion/motionModal";

interface Props {
  open: boolean;

  onClose: () => void;

  dependencies: {
    questionCount: number;

    exams: {
      id: number;

      title: string;

      section: {
        name: string;
      };
    }[];
  } | null;
}

export default function TopicDependencyModal({
  open,
  onClose,
  dependencies,
}: Props) {
  if (!open || !dependencies) {
    return null;
  }

  return (
    <MotionModal open={open} maxWidth="max-w-xl" contentClassName="max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <ModalHeader
          title="Cannot Archive Topic"
          description="This topic is currently being used in the system."
          onClose={onClose}
        />

        <div className="mt-6 space-y-5">
          <div>
            <p className="text-sm font-medium">
              Active Questions
            </p>

            <p className="text-muted-foreground mt-1">
              {dependencies.questionCount}
            </p>
          </div>

          {dependencies.exams.length > 0 && (
            <div>
              <p className="text-sm font-medium">
                Used In Exams
              </p>

              <div className="mt-3 space-y-2">
                {dependencies.exams.map((exam) => (
                  <div
                    key={exam.id}
                    className="bg-muted rounded-xl p-3"
                  >
                    <p className="font-medium">
                      {exam.title}
                    </p>

                    <p className="text-muted-foreground text-sm">
                      {exam.section.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-muted rounded-xl p-4 text-sm">
            Archive or remove these dependencies first
            before archiving this topic.
          </div>
        </div>
      </div>
    </MotionModal>
  );
}
