import { memo } from "react";

interface Props {
  children: React.ReactNode;

  columns?: string;
}

function StatsGrid({
  children,
  columns = "md:grid-cols-2 xl:grid-cols-4",
}: Props) {
  return (
    <div className={`grid gap-4 ${columns} `}>
      {children}
    </div>
  );
}

export default memo(StatsGrid);
