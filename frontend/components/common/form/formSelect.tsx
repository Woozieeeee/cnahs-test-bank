"use client";

import { memo } from "react";

import { selectClassName } from "./formStyles";

interface Option {
  label: string;

  value: string | number;
}

interface Props {
  value: string | number;

  options: Option[];

  disabled?: boolean;

  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

function FormSelect({
  value,
  options,
  disabled,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={onChange}
      className={selectClassName}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default memo(FormSelect);
