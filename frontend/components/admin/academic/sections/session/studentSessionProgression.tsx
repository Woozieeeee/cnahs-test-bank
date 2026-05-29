import { mockStudentSession } from "@/components/admin/academic/sections/data/mockStudentSession";

export default function StudentSessionProgression() {
  return (
    <div
      className="
        rounded-2xl
        border
        border-border
        bg-card
        p-6
      "
    >
      <h2 className="text-lg font-semibold">
        Progression Status
      </h2>

      <div className="mt-5 space-y-3">
        <p>
          Current Difficulty:{" "}
          {mockStudentSession.currentDifficulty}
        </p>

        <p>
          Current Score: {mockStudentSession.currentScore}%
        </p>

        <p>
          Required Score: {mockStudentSession.requiredScore}
          %
        </p>

        <p>Next Unlock: {mockStudentSession.nextUnlock}</p>
      </div>
    </div>
  );
}
