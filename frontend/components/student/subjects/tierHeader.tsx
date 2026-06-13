import { memo } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { DifficultyTierData } from "@/services/student_subject_details_service";

interface TierHeaderProps {
  tier: string;
  tierData: DifficultyTierData;
}

function TierHeaderComponent({ tier, tierData }: TierHeaderProps) {
  return (
    <Card className={`bg-muted/40 border border-border/50 p-6`}>
      <div className="space-y-4">
        <div>
          <h3 className={`text-lg font-semibold text-foreground`}>
            {tier} Tier
          </h3>
          <p className={`text-sm text-muted-foreground mt-1`}>
            Average Passing Score: {
              tierData.exams.length > 0
                ? Math.round(
                    tierData.exams.reduce((sum, exam) => sum + exam.passingScore, 0) /
                    tierData.exams.length
                  )
                : tierData.passingScore
            }%
          </p>
        </div>

        {tierData.highestScore !== null && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-sm text-muted-foreground`}>
                Your Highest Score
              </span>
              <span className={`text-lg font-bold text-foreground`}>
                {Math.round(tierData.highestScore)}%
              </span>
            </div>
            <Progress value={tierData.highestScore} className="h-2" />
          </div>
        )}

        {tierData.passed && (
          <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-lg p-3">
            <p className="text-sm font-semibold text-emerald-400">
              ✅ Tier Completed
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

export const TierHeader = memo(TierHeaderComponent);
