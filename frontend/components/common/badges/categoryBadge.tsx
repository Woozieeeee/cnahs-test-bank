import { memo } from "react";

interface Props {
  children: React.ReactNode;
}

function CategoryBadge({ children }: Props) {
  return (
    <span className="bg-muted text-muted-foreground rounded-md px-2 py-1 text-[11px] font-medium">
      {children}
    </span>
  );
}

export default memo(CategoryBadge);
