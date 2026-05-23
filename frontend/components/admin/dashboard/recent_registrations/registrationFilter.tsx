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
        rounded-lg
        border
        p-3
        outline-none
      "
    >
      <option value="ALL">All Status</option>

      <option value="PENDING">Pending</option>

      <option value="APPROVED">Approved</option>

      <option value="REJECTED">Rejected</option>
    </select>
  );
}
