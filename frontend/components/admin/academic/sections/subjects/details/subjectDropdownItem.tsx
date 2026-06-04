"use client";

import { memo } from "react";

interface Props {
  label: string;

  danger?: boolean;

  onClick: () => void;
}

function SubjectDropdownItem({
  label,
  danger,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
        danger
          ? `text-red-600 hover:bg-red-50`
          : `hover:bg-muted`
      } `}
    >
      {label}
    </button>
  );
}

export default memo(SubjectDropdownItem);
