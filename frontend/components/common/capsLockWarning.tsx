"use client";

interface Props {
  active: boolean;
}

export default function CapsLockWarning({ active }: Props) {
  if (!active) return null;

  return (
    <p className="mt-2 text-sm font-medium text-amber-600">
      Caps Lock is ON
    </p>
  );
}
