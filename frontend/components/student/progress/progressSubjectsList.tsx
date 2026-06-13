import { memo, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, Lock, CheckCircle2 } from "lucide-react";
import type { SubjectProgress } from "@/services/student_progress_service";

interface ProgressSubjectsListProps {
  subjects: SubjectProgress[];
}

const getStatusBadge = (status: string) => {
  const badges: Record<string, { bg: string; text: string; label: string }> = {
    COMPLETED: { bg: "bg-emerald-50", text: "text-emerald-700", label: "✅ Completed" },
    IN_PROGRESS: { bg: "bg-blue-50", text: "text-blue-700", label: "🔄 In Progress" },
    LOCKED: { bg: "bg-muted", text: "text-muted-foreground", label: "🔒 Locked" },
    STAND_BY: { bg: "bg-amber-50", text: "text-amber-700", label: "⏳ Waiting" },
  };
  return badges[status] || badges.IN_PROGRESS;
};

const getTierColor = (tier: string) => {
  const colors: Record<string, string> = {
    EASY: "text-blue-600",
    MEDIUM: "text-orange-600",
    HARD: "text-red-600",
    EXPERT: "text-purple-600",
  };
  return colors[tier] || "text-muted-foreground";
};

const getTierIcon = (passed: boolean, unlocked: boolean) => {
  if (passed) {
    return <CheckCircle2 size={16} className="text-emerald-500" />;
  }
  if (!unlocked) {
    return <Lock size={16} className="text-muted-foreground" />;
  }
  return <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />;
};

function ProgressSubjectsListComponent({
  subjects,
}: ProgressSubjectsListProps) {
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
    subjects.length > 0 ? subjects[0].id : null
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId);

  if (subjects.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Subject Progress</h2>
        <Card className="p-8 rounded-lg border border-border/50 text-center">
          <p className="text-muted-foreground">No subjects enrolled yet</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Subject Progress</h2>

      {/* Subject Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between bg-card rounded-lg p-4 border border-border/50 hover:border-primary/30 transition-all"
        >
          {selectedSubject ? (
            <div className="text-left">
              <p className="font-semibold text-foreground">{selectedSubject.name}</p>
              <p className="text-xs text-muted-foreground">{selectedSubject.code}</p>
            </div>
          ) : (
            <p className="text-muted-foreground">Select a subject</p>
          )}
          <ChevronDown
            size={20}
            className={`text-muted-foreground transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/50 rounded-lg shadow-lg z-10">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => {
                  setSelectedSubjectId(subject.id);
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-muted/50 border-b border-border/50 last:border-b-0 transition-colors"
              >
                <p className="font-medium text-foreground">{subject.name}</p>
                <p className="text-xs text-muted-foreground">{subject.code}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Subject Details */}
      {selectedSubject && (
        <Link href={`/student/subjects/${selectedSubject.slug}`}>
          <Card className="bg-card rounded-lg p-5 border border-border/50 hover:border-primary/30 transition-all cursor-pointer">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex-1">
                  <h3 className="line-clamp-1 text-base font-semibold text-foreground">
                    {selectedSubject.name}
                  </h3>
                  <p className="text-muted-foreground text-xs mt-1">{selectedSubject.code}</p>
                </div>
                <div className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(selectedSubject.status).bg} ${getStatusBadge(selectedSubject.status).text}`}>
                  {getStatusBadge(selectedSubject.status).label}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-muted/40 rounded-lg p-3 text-center">
                  <p className="text-muted-foreground text-xs">Progress</p>
                  <p className="mt-1.5 text-lg font-bold text-foreground">{selectedSubject.progress}%</p>
                </div>
                <div className="bg-muted/40 rounded-lg p-3 text-center">
                  <p className="text-muted-foreground text-xs">Current</p>
                  <p className={`mt-1.5 text-lg font-bold ${getTierColor(selectedSubject.currentTier)}`}>
                    {selectedSubject.currentTier}
                  </p>
                </div>
                <div className="bg-muted/40 rounded-lg p-3 text-center">
                  <p className="text-muted-foreground text-xs">Status</p>
                  <p className="mt-1.5 text-sm font-bold text-foreground">
                    {selectedSubject.expertPassed
                      ? "🏆"
                      : selectedSubject.hardPassed
                      ? "⭐"
                      : selectedSubject.mediumPassed
                      ? "✓"
                      : "○"}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground text-xs">Overall Progress</span>
                  <span className="text-xs font-semibold text-foreground">{selectedSubject.progress}%</span>
                </div>
                <Progress value={selectedSubject.progress} className="h-1.5" />
              </div>

              {/* Interactive Tier Status */}
              <div className="bg-muted/40 rounded-lg p-3 mb-3">
                <p className="text-muted-foreground text-xs mb-3 font-medium">Tier Completion</p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { tier: "EASY", passed: selectedSubject.easyPassed, unlocked: selectedSubject.easyUnlocked },
                    { tier: "MEDIUM", passed: selectedSubject.mediumPassed, unlocked: selectedSubject.mediumUnlocked },
                    { tier: "HARD", passed: selectedSubject.hardPassed, unlocked: selectedSubject.hardUnlocked },
                    { tier: "EXPERT", passed: selectedSubject.expertPassed, unlocked: selectedSubject.expertUnlocked },
                  ].map(({ tier, passed, unlocked }) => (
                    <div
                      key={tier}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-colors ${
                        passed
                          ? "bg-emerald-50/30 border-emerald-200/50"
                          : unlocked
                          ? "bg-blue-50/30 border-blue-200/50"
                          : "bg-muted/20 border-border/30"
                      }`}
                    >
                      <div>{getTierIcon(passed, unlocked)}</div>
                      <span className={`text-xs font-semibold ${getTierColor(tier)}`}>{tier}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-primary text-xs font-medium flex items-center justify-between mt-auto">
                <span>View Details</span>
                <span>→</span>
              </div>
            </div>
          </Card>
        </Link>
      )}
    </div>
  );
}

const ProgressSubjectsList = memo(ProgressSubjectsListComponent);
export default ProgressSubjectsList;
