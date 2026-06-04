import { memo } from "react";

import { textareaClassName } from "./formStyles";

interface Props {
  value: string;

  placeholder?: string;

  rows?: number;

  disabled?: boolean;

  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

function FormTextarea({
  value,
  placeholder,
  rows = 4,
  disabled,
  onChange,
}: Props) {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      onChange={onChange}
      className={textareaClassName}
    />
  );
}

export default memo(FormTextarea);
