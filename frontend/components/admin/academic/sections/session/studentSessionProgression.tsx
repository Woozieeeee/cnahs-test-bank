import { mockStudentSession } from "@/components/admin/academic/sections/data/mockStudentSession";
import { memo } from "react";
const levels = ["EASY", "MEDIUM", "HARD", "EXPERT"];
const currentLevelIndex = levels.indexOf(
  mockStudentSession.currentDifficulty
);

function StudentSessionProgression() {
  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      {/* HEADER */}

      <div>
        <h2 className="text-foreground text-lg font-semibold">
          Progression Status
        </h2>

        <p className="text-muted-foreground mt-1 text-sm">
          Monitor the student's progression across exam
          difficulty levels.
        </p>
      </div>

      {/* SCORE */}

      <div className="border-border/60 bg-muted/30 mt-6 rounded-2xl border p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">
              Current Score
            </p>

            <h3 className="text-foreground mt-1 text-3xl font-bold">
              {mockStudentSession.currentScore}%
            </h3>
          </div>

          <div className="bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium">
            {mockStudentSession.currentDifficulty}
          </div>
        </div>

        {/* PROGRESS BAR */}

        <div className="bg-muted mt-5 h-3 overflow-hidden rounded-full">
          <div
            className="bg-primary h-full rounded-full transition-all duration-300"
            style={{
              width: `${mockStudentSession.currentScore}%`,
            }}
          />
        </div>

        <p className="text-muted-foreground mt-3 text-sm">
          Required: {mockStudentSession.requiredScore}% to
          unlock {mockStudentSession.nextUnlock}
        </p>
      </div>

      {/* LEVELS */}

      <div className="mt-8 space-y-4">
        {levels.map((level, index) => {
          const isCurrent =
            level === mockStudentSession.currentDifficulty;

          const isCompleted = index < currentLevelIndex;

          const isLocked = index > currentLevelIndex;

          return (
            <div
              key={level}
              className="border-border/60 bg-muted/20 flex items-center justify-between rounded-xl border px-4 py-4"
            >
              <div className="flex items-center gap-3">
                {/* ICON */}

                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    isCompleted
                      ? `bg-green-100 text-green-700`
                      : isCurrent
                        ? `bg-primary text-primary-foreground`
                        : `bg-muted text-muted-foreground`
                  } `}
                >
                  {isCompleted
                    ? "✓"
                    : isLocked
                      ? "🔒"
                      : "•"}
                </div>

                {/* LABEL */}

                <div>
                  <p className="text-foreground font-medium">
                    {level}
                  </p>

                  <p className="text-muted-foreground text-xs">
                    {isCompleted
                      ? "Completed"
                      : isCurrent
                        ? "Current Difficulty"
                        : "Locked"}
                  </p>
                </div>
              </div>

              {/* CURRENT BADGE */}

              {isCurrent && (
                <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold">
                  ACTIVE
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(StudentSessionProgression);
