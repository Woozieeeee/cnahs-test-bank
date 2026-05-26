interface Props {
  value: string;

  onChange: (value: string) => void;
}

export default function UsersSearch({
  value,

  onChange,
}: Props) {
  return (
    <input
      type="text"
      placeholder="Search users..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-full
        rounded-xl
        border
        px-4
        py-3
        transition
        focus:border-black
      "
    />
  );
}
