interface Props {
  visible: boolean;
}

export default function ActivityViolationBadge({
  visible,
}: Props) {
  if (!visible) return null;

  return (
    <span
      className="
        rounded-full
        border
        border-red-200
        bg-red-100
        px-2
        py-1
        text-[10px]
        font-bold
        uppercase
        tracking-wide
        text-red-700
      "
    >
      Violation
    </span>
  );
}
