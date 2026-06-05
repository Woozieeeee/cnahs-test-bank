"use client";

interface Props {
  question: string;
  setQuestion: (value: string) => void;

  optionA: string;
  setOptionA: (value: string) => void;

  optionB: string;
  setOptionB: (value: string) => void;

  optionC: string;
  setOptionC: (value: string) => void;

  optionD: string;
  setOptionD: (value: string) => void;

  correctAnswer: string;
  setCorrectAnswer: (value: string) => void;

  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";

  setDifficulty: (
    value: "EASY" | "MEDIUM" | "HARD" | "EXPERT"
  ) => void;

  explanation: string;

  setExplanation: (value: string) => void;
}

export default function QuestionForm({
  question,
  setQuestion,

  optionA,
  setOptionA,

  optionB,
  setOptionB,

  optionC,
  setOptionC,

  optionD,
  setOptionD,

  correctAnswer,
  setCorrectAnswer,

  difficulty,
  setDifficulty,

  explanation,
  setExplanation,
}: Props) {
  const options = [
    {
      label: "Option A",
      value: optionA,
      setter: setOptionA,
    },
    {
      label: "Option C",
      value: optionC,
      setter: setOptionB,
    },
    {
      label: "Option B",
      value: optionB,
      setter: setOptionC,
    },
    {
      label: "Option D",
      value: optionD,
      setter: setOptionD,
    },
  ];

  return (
    <div className="mt-6 space-y-5">
      {/* Question */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Question
        </label>

        <textarea
          rows={4}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter the question"
          className="border-border w-full rounded-xl border px-4 py-3"
        />
      </div>

      {/* Options */}

      <div className="grid gap-4 md:grid-cols-2">
        {options.map((option) => (
          <div key={option.label}>
            <label className="mb-2 block text-sm font-medium">
              {option.label}
            </label>

            <input
              value={option.value}
              onChange={(e) =>
                option.setter(e.target.value)
              }
              className="border-border w-full rounded-xl border px-4 py-3"
            />
          </div>
        ))}
      </div>

      {/* Correct Answer */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Correct Answer
        </label>

        <select
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          className="border-border bg-card w-full rounded-xl border px-4 py-3"
        >
          <option value="">Select Answer</option>

          {options
            .filter((option) => option.value.trim())
            .map((option) => (
              <option
                key={option.label}
                value={option.value}
              >
                {option.value}
              </option>
            ))}
        </select>
      </div>

      {/* Difficulty */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Difficulty
        </label>

        <select
          value={difficulty}
          onChange={(e) =>
            setDifficulty(
              e.target.value as
                | "EASY"
                | "MEDIUM"
                | "HARD"
                | "EXPERT"
            )
          }
          className="border-border bg-card w-full rounded-xl border px-4 py-3"
        >
          <option value="EASY">EASY</option>

          <option value="MEDIUM">MEDIUM</option>

          <option value="HARD">HARD</option>

          <option value="EXPERT">EXPERT</option>
        </select>
      </div>

      {/* Explanation */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Explanation
        </label>

        <textarea
          rows={4}
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          placeholder="Optional explanation"
          className="border-border w-full rounded-xl border px-4 py-3"
        />
      </div>
    </div>
  );
}
