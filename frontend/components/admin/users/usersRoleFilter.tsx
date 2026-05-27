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
      <option value="ALL">All Roles</option>

      <option value="STUDENT">Students</option>

      <option value="FACULTY">Faculty</option>
    </select>
  );
}
