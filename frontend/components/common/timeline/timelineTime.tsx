import { memo } from "react";

interface Props {
  children: React.ReactNode;
}

function TimelineTime({ children }: Props) {
  return (
    <div className="text-muted-foreground text-right text-xs">
      {children}
    </div>
  );
}

export default memo(TimelineTime);
