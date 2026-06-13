import { memo } from "react";
import { Card } from "@/components/ui/card";

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
}

const DashboardStatCard = memo(function DashboardStatCard({
  title,
  value,
  description,
  icon,
}: DashboardStatCardProps) {
  return (
    <Card className="rounded-lg p-5 border border-border/50">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="text-muted-foreground/30">{icon}</div>
      </div>
    </Card>
  );
});

export default DashboardStatCard;
