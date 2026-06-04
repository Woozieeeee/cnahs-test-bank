import { memo } from "react";

interface Props {
  children: React.ReactNode;
}

function TimelineContent({ children }: Props) {
  return <div>{children}</div>;
}

export default memo(TimelineContent);
