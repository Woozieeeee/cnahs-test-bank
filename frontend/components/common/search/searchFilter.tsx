"use client";

import { memo } from "react";

interface Option {
  label: string;
  value: string;
}

interface Props {
  value: string;

  onChange: (value: string) => void;

  options: Option[];

  placeholder?: string;

  className?: string;
}

function SearchFilter({
  value,
  onChange,
  options,
  placeholder = "Select",
  className = "",
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`border-border bg-background focus:border-ring h-11 rounded-xl border px-4 text-sm transition-colors outline-none ${className} `}
    >
      <option value="">{placeholder}</option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default memo(SearchFilter);
