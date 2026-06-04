interface Props {
  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
}

export default function DifficultyBadge({
  difficulty,
}: Props) {
  const styles = {
    EASY: "bg-green-100 text-green-700",

    MEDIUM: "bg-yellow-100 text-yellow-700",

    HARD: "bg-orange-100 text-orange-700",

    EXPERT: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium ${styles[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}
