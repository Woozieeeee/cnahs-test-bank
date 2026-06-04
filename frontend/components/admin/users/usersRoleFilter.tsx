import MotionDropdown from "@/components/motion/motionDropdown";

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
      className="border-border bg-background text-foreground focus:border-ring focus:ring-ring/20 cursor-pointer rounded-xl border px-4 py-3 text-sm transition outline-none focus:ring-2"
    >
      <option value="ALL">All Roles</option>

      <option value="STUDENT">Students</option>

      <option value="FACULTY">Faculty</option>
    </select>
  );
}
