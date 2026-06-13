"use client";

import { memo } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SubjectCardData } from "@/services/student_dashboard_service";
import { Lock, CheckCircle2, PlayCircle } from "lucide-react";

interface SubjectCardProps {
  subject: SubjectCardData;
}

function SubjectCardComponent({ subject }: SubjectCardProps) {
  // Determine status badge
  const getStatusBadge = () => {
    if (subject.status === "COMPLETED") {
      return (
        <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
          <CheckCircle2 size={14} />
          🏆 Completed
        </div>
      );
    }

    if (subject.status === "LOCKED") {
      return (
        <div className="flex items-center gap-1 bg-muted/40 text-muted-foreground px-2 py-1 rounded-full text-xs font-medium">
          <Lock size={14} />
          🔒 Locked
        </div>
      );
    }

    if (subject.status === "STAND_BY") {
      return (
        <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-full text-xs font-medium">
          <span className="text-amber-700">⏳</span>
          Stand By
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
        <PlayCircle size={14} />
        🟢 In Progress
      </div>
    );
  };

  // Get tier color
  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      EASY: "text-blue-600",
      MEDIUM: "text-orange-600",
      HARD: "text-red-600",
      EXPERT: "text-purple-600",
    };
    return colors[tier] || "text-muted-foreground";
  };

  return (
    <Link href={`/student/subjects/${subject.slug}`}>
      <Card className="bg-card hover:border-primary/30 rounded-2xl border p-5 transition-all">
        <div className="flex h-full flex-col">
          {/* HEADER */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="line-clamp-2 text-lg font-semibold text-foreground">
                {subject.name}
              </h3>
              <p className="text-muted-foreground mt-1 text-sm">
                {subject.code}
              </p>
            </div>
            {getStatusBadge()}
          </div>

          {/* METRICS */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="bg-muted/40 rounded-xl p-4 text-center">
              <p className="text-muted-foreground text-xs">Progress</p>
              <p className="mt-2 text-xl font-bold">{subject.progress}%</p>
            </div>
            <div className="bg-muted/40 rounded-xl p-4 text-center">
              <p className="text-muted-foreground text-xs">Exams</p>
              <p className="mt-2 text-xl font-bold">{subject.examsAvailable}</p>
            </div>
          </div>

          {/* CURRENT TIER AND NEXT UNLOCK */}
          <div className="mt-4 bg-muted/40 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">Current Tier</span>
              <span className={`font-semibold ${getTierColor(subject.currentTier)}`}>
                {subject.currentTier}
              </span>
            </div>

            {subject.nextUnlock && subject.progress < 100 ? (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs">Next Unlock</span>
                <span className={`font-semibold ${getTierColor(subject.nextUnlock)}`}>
                  {subject.nextUnlock}
                </span>
              </div>
            ) : subject.progress === 100 ? (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs">Status</span>
                <span className="font-semibold text-emerald-600">Mastered ✓</span>
              </div>
            ) : null}
          </div>

          {/* PROGRESS BAR */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">Overall Progress</span>
              <span className="text-xs font-semibold text-foreground">{subject.progress}%</span>
            </div>
            <Progress value={subject.progress} className="h-2" />
          </div>

          <div className="text-primary mt-auto pt-5 text-sm font-medium">
            View Subject →
          </div>
        </div>
      </Card>
    </Link>
  );
}

const SubjectCard = memo(SubjectCardComponent);
export default SubjectCard;
