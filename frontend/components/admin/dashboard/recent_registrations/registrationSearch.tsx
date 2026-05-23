interface Props {
  value: string;

  onChange: (value: string) => void;
}

export default function RegistrationSearch({
  value,
  onChange,
}: Props) {
  return (
    <input
      type="text"
      placeholder="Search student..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-full
        rounded-lg
        border
        p-3
        outline-none
        focus:ring-2
        focus:ring-black
      "
    />
  );
}
