import { memo } from "react";
import type { SubjectDetailsData } from "@/services/student_subject_details_service";

type DifficultyTier = "EASY" | "MEDIUM" | "HARD" | "EXPERT";
const DIFFICULTIES: DifficultyTier[] = ["EASY", "MEDIUM", "HARD", "EXPERT"];

interface TierTabsProps {
  selectedTab: DifficultyTier;
  onTabChange: (tier: DifficultyTier) => void;
  subjectData: SubjectDetailsData;
}

function TierTabsComponent({ selectedTab, onTabChange, subjectData }: TierTabsProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {DIFFICULTIES.map((tier) => {
        const tierData = subjectData.tiers[tier];
        const isActive = selectedTab === tier;

        return (
          <button
            key={tier}
            onClick={() => onTabChange(tier)}
            disabled={!tierData.isUnlocked}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 border-2 ${
              !tierData.isUnlocked
                ? "bg-muted/20 text-muted-foreground cursor-not-allowed opacity-50 border-border/30"
                : isActive
                ? `bg-primary text-primary-foreground shadow-md border-primary`
                : `bg-muted/40 text-muted-foreground hover:bg-muted/50 border-border/50`
            }`}
          >
            <span>{tier}</span>
            <span>
              {tierData.passed
                ? "✅"
                : tierData.isUnlocked
                ? "🔄"
                : "🔒"}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export const TierTabs = memo(TierTabsComponent);
