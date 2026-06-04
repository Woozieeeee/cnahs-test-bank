import { memo } from "react";

interface Props {
  children: React.ReactNode;

  className?: string;
}

function InfoCard({ children, className = "" }: Props) {
  return (
    <div
      className={`border-border bg-muted/20 rounded-xl border p-4 ${className} `}
    >
      {children}
    </div>
  );
}

export default memo(InfoCard);
