interface Props {
  type: "success" | "error" | "info" | "";

  message: string;
}

export default function TrackStatusResult({
  type,

  message,
}: Props) {
  if (!message) return null;

  return (
    <div
      className={`
        mb-4
        rounded-xl
        border
        p-4
        text-sm

        ${
          type === "success"
            ? `
              border-emerald-200
              bg-emerald-50
              text-emerald-700
            `
            : type === "info"
              ? `
                border-amber-200
                bg-amber-50
                text-amber-700
              `
              : `
                border-red-200
                bg-red-50
                text-red-700
              `
        }
      `}
    >
      {message}
    </div>
  );
}
