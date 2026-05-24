interface Props {
  value: string;

  onChange: (value: string) => void;
}

export default function UsersRoleFilter({
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
        px-4
        py-3
        outline-none
      "
    >
      <option value="ALL">All Roles</option>

      <option value="STUDENT">Students</option>

      <option value="FACULTY">Faculty</option>
    </select>
  );
}
