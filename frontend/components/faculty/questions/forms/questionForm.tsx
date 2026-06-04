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
  return (
    <div className="mt-6 space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium">
          Question
        </label>

        <textarea
          rows={4}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border-border w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Option A
        </label>

        <input
          value={optionA}
          onChange={(e) => setOptionA(e.target.value)}
          className="border-border w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Option B
        </label>

        <input
          value={optionB}
          onChange={(e) => setOptionB(e.target.value)}
          className="border-border w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Option C
        </label>

        <input
          value={optionC}
          onChange={(e) => setOptionC(e.target.value)}
          className="border-border w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Option D
        </label>

        <input
          value={optionD}
          onChange={(e) => setOptionD(e.target.value)}
          className="border-border w-full rounded-xl border px-4 py-3"
        />
      </div>

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

          {optionA && (
            <option value={optionA}>{optionA}</option>
          )}

          {optionB && (
            <option value={optionB}>{optionB}</option>
          )}

          {optionC && (
            <option value={optionC}>{optionC}</option>
          )}

          {optionD && (
            <option value={optionD}>{optionD}</option>
          )}
        </select>
      </div>

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

      <div>
        <label className="mb-2 block text-sm font-medium">
          Explanation
        </label>

        <textarea
          rows={4}
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          className="border-border w-full rounded-xl border px-4 py-3"
        />
      </div>
    </div>
  );
}
