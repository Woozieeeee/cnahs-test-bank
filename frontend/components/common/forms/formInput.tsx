import { memo } from "react";

import { inputClassName } from "./formStyles";

interface Props {
  type?: string;

  value: string;

  placeholder?: string;

  maxLength?: number;

  disabled?: boolean;

  autoFocus?: boolean;

  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

function FormInput({
  type = "text",
  value,
  placeholder,
  maxLength,
  disabled,
  autoFocus,
  onChange,
}: Props) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      disabled={disabled}
      autoFocus={autoFocus}
      onChange={onChange}
      className={inputClassName}
    />
  );
}

export default memo(FormInput);
