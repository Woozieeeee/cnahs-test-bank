"use client";

interface Props {
  value: string;

  onChange: (value: string) => void;
}

export default function SectionExamsSearch({
  value,
  onChange,
}: Props) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search exams..."
      className="border-border bg-card w-full rounded-xl border px-4 py-2.5 text-sm"
    />
  );
}
