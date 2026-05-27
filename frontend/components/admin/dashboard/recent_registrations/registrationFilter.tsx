interface Props {
  value: string;

  onChange: (value: string) => void;
}

export default function RegistrationFilter({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        rounded-xl
        border
        border-border
        bg-background
        px-4
        py-3
        text-sm
        text-foreground
        outline-none
        transition
        focus:border-ring
        focus:ring-2
        focus:ring-ring/20
        cursor-pointer
      "
    >
      <option value="ALL">All Status</option>

      <option value="PENDING">Pending</option>

      <option value="APPROVED">Approved</option>

      <option value="REJECTED">Rejected</option>
    </select>
  );
}
