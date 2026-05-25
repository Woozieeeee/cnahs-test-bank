interface Props {
  label: string;

  value: string;
}

export default function ActivityDetailItem({
  label,
  value,
}: Props) {
  return (
    <div
      className="
        rounded-xl
        bg-slate-50
        p-4
      "
    >
      <p
        className="
          text-sm
          text-slate-500
        "
      >
        {label}
      </p>

      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}
