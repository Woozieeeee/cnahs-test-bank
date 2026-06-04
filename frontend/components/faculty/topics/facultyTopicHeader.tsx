"use client";

import MotionButton from "@/components/motion/motionButton";

interface Props {
  onCreate: () => void;
}

export default function FacultyTopicHeader({
  onCreate,
}: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Topic Management
        </h1>

        <p className="text-muted-foreground mt-2">
          Organize learning areas and question categories
          for this subject.
        </p>
      </div>

      <MotionButton
        onClick={onCreate}
        className="bg-primary text-primary-foreground rounded-xl px-4 py-2 font-medium"
      >
        Create Topic
      </MotionButton>
    </div>
  );
}
