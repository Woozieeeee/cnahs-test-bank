import { memo } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TierStatItem {
  tier: string;
  completed: number;
  inProgress: number;
  locked: number;
  totalAttempts: number;
  averageScore: number;
  passRate: number;
}

interface ProgressTierStatsProps {
  tierStats: TierStatItem[];
}

const getTierColor = (tier: string) => {
  const colors: Record<string, { text: string; border: string }> = {
    EASY: { text: "text-blue-600", border: "border-blue-200" },
    MEDIUM: { text: "text-orange-600", border: "border-orange-200" },
    HARD: { text: "text-red-600", border: "border-red-200" },
    EXPERT: { text: "text-purple-600", border: "border-purple-200" },
  };
  return colors[tier] || { text: "text-blue-600", border: "border-blue-200" };
};

const ProgressTierStats = memo(function ProgressTierStats({ tierStats }: ProgressTierStatsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Difficulty Tier Performance</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tierStats.map((tier) => {
          const colors = getTierColor(tier.tier);
          const total = tier.completed + tier.inProgress + tier.locked;

          return (
            <Card key={tier.tier} className={`p-4 rounded-lg border border-border/50`}>
              <div className="space-y-3">
                {/* Tier Header */}
                <div className="flex items-center justify-between">
                  <h3 className={`font-semibold text-sm ${colors.text}`}>{tier.tier}</h3>
                  <span className="text-xs font-bold text-muted-foreground bg-muted/40 px-2 py-1 rounded">
                    {tier.passRate}%
                  </span>
                </div>

                {/* Status Breakdown */}
                <div className="bg-muted/30 rounded-lg p-3 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completed</span>
                    <span className="font-semibold text-foreground">{tier.completed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">In Progress</span>
                    <span className="font-semibold text-foreground">{tier.inProgress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Locked</span>
                    <span className="font-semibold text-foreground">{tier.locked}</span>
                  </div>
                </div>

                {/* Average Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Avg. Score</span>
                    <span className="text-xs font-bold text-foreground">{Math.round(tier.averageScore)}%</span>
                  </div>
                  <Progress value={tier.averageScore} className="h-1.5" />
                </div>

                {/* Attempts */}
                <div className="text-xs text-muted-foreground">
                  {tier.totalAttempts} attempt{tier.totalAttempts !== 1 ? "s" : ""}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
});

export default ProgressTierStats;
