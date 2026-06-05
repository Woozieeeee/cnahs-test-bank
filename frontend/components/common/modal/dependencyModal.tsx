"use client";

import ModalHeader from "@/components/common/modal/modalHeader";
import ModalActions from "@/components/common/modal/modalActions";
import { memo } from "react";

interface DependencyExam {
  id: number;

  title: string;

  subject?: string;

  section: string;

  status: string;
}

interface Props {
  open: boolean;

  onClose: () => void;

  title?: string;

  dependencies: {
    examCount: number;

    exams: DependencyExam[];
  } | null;
}

function DependencyModal({
  open,
  onClose,
  dependencies,
  title = "Cannot Archive Item",
}: Props) {
  if (!open || !dependencies) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-card border-border w-full max-w-2xl rounded-2xl border p-6">
        <ModalHeader
          title={title}
          description="This item is currently being used and cannot be archived."
          onClose={onClose}
        />

        <div className="mt-6">
          <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 p-4">
            <p className="font-medium text-amber-800">
              Active Dependencies Found
            </p>

            <p className="mt-1 text-sm text-amber-700">
              This item is currently used in{" "}
              {dependencies.examCount} active exam
              {dependencies.examCount > 1 ? "s" : ""}.
            </p>
          </div>

          <div className="space-y-3">
            {dependencies.exams.map((exam) => (
              <div
                key={exam.id}
                className="border-border rounded-xl border p-4"
              >
                <p className="font-semibold">
                  {exam.title}
                </p>

                {exam.subject && (
                  <p className="text-muted-foreground mt-1 text-sm">
                    Subject: {exam.subject}
                  </p>
                )}

                <p className="text-muted-foreground text-sm">
                  Section: {exam.section}
                </p>

                <p className="mt-2 text-xs font-medium">
                  Status: {exam.status}
                </p>
              </div>
            ))}
          </div>
        </div>

        <ModalActions
          submitLabel="Okay"
          cancelDisabled
          onSubmit={onClose}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}
export default memo(DependencyModal);
