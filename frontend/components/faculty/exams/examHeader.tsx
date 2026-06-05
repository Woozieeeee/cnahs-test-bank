"use client";

import { memo } from "react";

import MotionButton from "@/components/motion/motionButton";

interface Props {
  onCreate: () => void;
}

function ExamHeader({ onCreate }: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">Exams</h1>

        <p className="text-muted-foreground mt-2">
          Create, schedule, and manage exams.
        </p>
      </div>

      <MotionButton
        onClick={onCreate}
        className="bg-primary text-primary-foreground rounded-xl px-4 py-2"
      >
        Create Exam
      </MotionButton>
    </div>
  );
}

export default memo(ExamHeader);
