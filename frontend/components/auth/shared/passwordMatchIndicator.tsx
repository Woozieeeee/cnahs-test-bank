interface Props {
  visible: boolean;

  match: boolean;
}

export default function PasswordMatchIndicator({
  visible,

  match,
}: Props) {
  if (!visible) return null;

  return (
    <p
      className={`mt-2 text-sm ${
        match ? "text-emerald-600" : "text-red-500"
      }`}
    >
      {match
        ? "✓ Passwords match"
        : "Passwords do not match"}
    </p>
  );
}
