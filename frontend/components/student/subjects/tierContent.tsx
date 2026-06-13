import { memo, useState } from "react";
import { Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { TierHeader } from "./tierHeader";
import { ActiveExams } from "./activeExams";
import { ExamHistory } from "./examHistory";
import type { DifficultyTierData } from "@/services/student_subject_details_service";

interface TierContentProps {
  tier: string;
  tierData: DifficultyTierData;
}

type TabType = "active" | "history";

function TierContentComponent({ tier, tierData }: TierContentProps) {
  const [activeTab, setActiveTab] = useState<TabType>("active");

  if (!tierData.isUnlocked) {
    return (
      <Card className="bg-muted/40 border-muted p-8">
        <div className="flex items-center gap-3">
          <Lock className="text-muted-foreground" size={24} />
          <div>
            <h3 className="font-semibold text-foreground">
              Tier Locked
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Pass the previous tier to unlock this difficulty level.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <TierHeader tier={tier} tierData={tierData} />

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-border/50">
        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-3 font-medium transition-all border-b-2 ${
            activeTab === "active"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Active Exams
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-3 font-medium transition-all border-b-2 ${
            activeTab === "history"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          History
        </button>
      </div>

      {/* Tab Content with Smooth Transitions */}
      <div className="min-h-[300px] animate-in fade-in-50 duration-300">
        {activeTab === "active" && <ActiveExams exams={tierData.exams} />}
        {activeTab === "history" && <ExamHistory exams={tierData.exams} />}
      </div>
    </div>
  );
}

export const TierContent = memo(TierContentComponent);
