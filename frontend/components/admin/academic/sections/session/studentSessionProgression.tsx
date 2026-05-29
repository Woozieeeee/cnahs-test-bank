import { mockStudentSession } from "@/components/admin/academic/sections/data/mockStudentSession";

const levels = ["EASY", "MEDIUM", "HARD", "EXPERT"];

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
      {/* HEADER */}

      <div>
        <h2
          className="
            text-lg
            font-semibold
            text-foreground
          "
        >
          Progression Status
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-muted-foreground
          "
        >
          Monitor the student's progression across exam
          difficulty levels.
        </p>
      </div>

      {/* SCORE */}

      <div
        className="
          mt-6
          rounded-2xl
          border
          border-border/60
          bg-muted/30
          p-5
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <div>
            <p
              className="
                text-sm
                text-muted-foreground
              "
            >
              Current Score
            </p>

            <h3
              className="
                mt-1
                text-3xl
                font-bold
                text-foreground
              "
            >
              {mockStudentSession.currentScore}%
            </h3>
          </div>

          <div
            className="
              rounded-full
              bg-primary/10
              px-4
              py-2
              text-sm
              font-medium
              text-primary
            "
          >
            {mockStudentSession.currentDifficulty}
          </div>
        </div>

        {/* PROGRESS BAR */}

        <div
          className="
            mt-5
            h-3
            overflow-hidden
            rounded-full
            bg-muted
          "
        >
          <div
            className="
              h-full
              rounded-full
              bg-primary
            "
            style={{
              width: `${mockStudentSession.currentScore}%`,
            }}
          />
        </div>

        <p
          className="
            mt-3
            text-sm
            text-muted-foreground
          "
        >
          Required: {mockStudentSession.requiredScore}% to
          unlock {mockStudentSession.nextUnlock}
        </p>
      </div>

      {/* LEVELS */}

      <div className="mt-8 space-y-4">
        {levels.map((level, index) => {
          const isCurrent =
            level === mockStudentSession.currentDifficulty;

          const isCompleted =
            index <
            levels.indexOf(
              mockStudentSession.currentDifficulty
            );

          const isLocked =
            index >
            levels.indexOf(
              mockStudentSession.currentDifficulty
            );

          return (
            <div
              key={level}
              className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                border-border/60
                bg-muted/20
                px-4
                py-4
              "
            >
              <div className="flex items-center gap-3">
                {/* ICON */}

                <div
                  className={`
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    text-sm
                    font-bold

                    ${
                      isCompleted
                        ? `
                          bg-green-100
                          text-green-700
                        `
                        : isCurrent
                          ? `
                            bg-primary
                            text-primary-foreground
                          `
                          : `
                            bg-muted
                            text-muted-foreground
                          `
                    }
                  `}
                >
                  {isCompleted
                    ? "✓"
                    : isLocked
                      ? "🔒"
                      : "•"}
                </div>

                {/* LABEL */}

                <div>
                  <p
                    className="
                      font-medium
                      text-foreground
                    "
                  >
                    {level}
                  </p>

                  <p
                    className="
                      text-xs
                      text-muted-foreground
                    "
                  >
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
                <div
                  className="
                    rounded-full
                    bg-primary/10
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-primary
                  "
                >
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
