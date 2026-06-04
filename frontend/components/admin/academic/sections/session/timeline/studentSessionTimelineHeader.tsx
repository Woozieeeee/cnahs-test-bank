import { memo } from "react";

import SeverityBadge from "@/components/common/badges/severityBadge";

interface Props {
  title: string;

  severity: string;
}

function StudentSessionTimelineHeader({
  title,
  severity,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold">
          !
        </div>

        <h4 className="text-foreground font-semibold">
          {title}
        </h4>
      </div>

      <SeverityBadge severity={severity} />
    </div>
  );
}

export default memo(StudentSessionTimelineHeader);
