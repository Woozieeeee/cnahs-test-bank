import { memo } from "react";

interface Props {
  children: React.ReactNode;
}

function TimelineContainer({ children }: Props) {
  return <div className="space-y-4">{children}</div>;
}

export default memo(TimelineContainer);
