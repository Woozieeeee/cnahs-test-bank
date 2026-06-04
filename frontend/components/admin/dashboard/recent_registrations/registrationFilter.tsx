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
      className="border-border bg-background text-foreground focus:border-ring focus:ring-ring/20 cursor-pointer rounded-xl border px-4 py-3 text-sm transition outline-none focus:ring-2"
    >
      <option value="ALL">All Status</option>

      <option value="PENDING">Pending</option>

      <option value="APPROVED">Approved</option>

      <option value="REJECTED">Rejected</option>
    </select>
  );
}
