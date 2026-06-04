import { memo } from "react";

interface Props {
  label: string;
}

function InfoCardHeader({ label }: Props) {
  return (
    <p className="text-muted-foreground text-xs tracking-wide uppercase">
      {label}
    </p>
  );
}

export default memo(InfoCardHeader);
