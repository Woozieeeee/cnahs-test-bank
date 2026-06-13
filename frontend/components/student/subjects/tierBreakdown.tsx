import { memo } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { SubjectDetailsData } from "@/services/student_subject_details_service";

type DifficultyTier = "EASY" | "MEDIUM" | "HARD" | "EXPERT";
const DIFFICULTIES: DifficultyTier[] = ["EASY", "MEDIUM", "HARD", "EXPERT"];

interface TierBreakdownProps {
  subjectData: SubjectDetailsData;
}

function TierBreakdownComponent({ subjectData }: TierBreakdownProps) {
  const tiersPassed = DIFFICULTIES.filter((t) => subjectData.tiers[t].passed).length;
  const overallProgress = Math.round((tiersPassed / 4) * 100);

  const getTierBadgeColor = (tier: string) => {
    const colors: Record<string, string> = {
      EASY: "text-blue-600",
      MEDIUM: "text-orange-600",
      HARD: "text-red-600",
      EXPERT: "text-purple-600",
    };
    return colors[tier] || "text-muted-foreground";
  };

  const getTierBorderColor = (tier: string) => {
    const colors: Record<string, string> = {
      EASY: "border-blue-500/60 hover:border-blue-500",
      MEDIUM: "border-orange-500/60 hover:border-orange-500",
      HARD: "border-red-500/60 hover:border-red-500",
      EXPERT: "border-purple-500/60 hover:border-purple-500",
    };
    return colors[tier] || "border-blue-500/60";
  };

  return (
    <Card className="bg-muted/20 border-border/50 p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Overall Subject Progress
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {tiersPassed} of 4 difficulty tiers completed
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Master All Tiers</span>
            <span className="text-sm font-semibold text-foreground">
              {overallProgress}%
            </span>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>

        {/* Tier Breakdown Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {DIFFICULTIES.map((tier) => {
            const tierData = subjectData.tiers[tier];
            const badgeColor = getTierBadgeColor(tier);
            
            const now = new Date();
            const activeExamCount = tierData.exams.filter((exam) => {
              const endsAt = exam.endsAt ? new Date(exam.endsAt) : null;
              if (endsAt && endsAt <= now) return false;
              return true;
            }).length;

            return (
              <div
                key={tier}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-sm ${
                  tierData.isUnlocked
                    ? tierData.passed
                      ? `bg-muted/50 border-emerald-500/60 hover:border-emerald-500`
                      : `bg-muted/40 ${getTierBorderColor(tier)}`
                    : "bg-muted/20 border-border/30 opacity-60"
                }`}
              >
                <p className={`text-xs font-medium uppercase ${badgeColor}`}>
                  {tier}
                </p>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">
                      {tierData.highestScore !== null
                        ? `${Math.round(tierData.highestScore)}%`
                        : "-"}
                    </span>
                    <span className="text-xs">
                      {tierData.passed
                        ? "✅"
                        : tierData.isUnlocked
                        ? "🔄"
                        : "🔒"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {activeExamCount} exam{activeExamCount !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

export const TierBreakdown = memo(TierBreakdownComponent);
