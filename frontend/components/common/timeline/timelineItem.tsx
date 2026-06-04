import { memo } from "react";

interface Props {
  children: React.ReactNode;
}

function TimelineItem({ children }: Props) {
  return (
    <div className="grid grid-cols-[70px_20px_1fr] gap-3">
      {children}
    </div>
  );
}

export default memo(TimelineItem);
