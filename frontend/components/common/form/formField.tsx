import { memo } from "react";

import FormLabel from "./formLabel";

interface Props {
  label: string;

  children: React.ReactNode;
}

function FormField({ label, children }: Props) {
  return (
    <div>
      <FormLabel>{label}</FormLabel>

      <div className="mt-2">{children}</div>
    </div>
  );
}

export default memo(FormField);
