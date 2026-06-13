import { memo } from "react";
import { AlertTriangle, TrendingUp, CheckCircle2, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ViolationThresholdPanelProps {
  totalViolations: number;
  violationThreshold: number;
}

function ViolationThresholdPanelComponent({
  totalViolations,
  violationThreshold,
}: ViolationThresholdPanelProps) {
  const percentage = Math.round((totalViolations / violationThreshold) * 100);
  const isWarning = totalViolations > violationThreshold * 0.5;
  const isCritical = totalViolations >= violationThreshold;
  const remaining = Math.max(0, violationThreshold - totalViolations);

  // Status-based styling
  let statusColor = "text-emerald-600";
  let statusBg = "bg-emerald-50 border-emerald-200";
  let progressColor = "bg-emerald-500";
  let statusLabel = "SAFE";
  let statusIcon = CheckCircle2;

  if (isCritical) {
    statusColor = "text-red-600";
    statusBg = "bg-red-50 border-red-200";
    progressColor = "bg-red-500";
    statusLabel = "CRITICAL";
    statusIcon = AlertTriangle;
  } else if (isWarning) {
    statusColor = "text-amber-600";
    statusBg = "bg-amber-50 border-amber-200";
    progressColor = "bg-amber-500";
    statusLabel = "WARNING";
    statusIcon = AlertCircle;
  }

  const StatusIcon = statusIcon;

  return (
    <Card className={`border rounded-lg p-5 ${statusBg}`}>
      {/* Header with Icon and Title */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className={`${statusColor} flex-shrink-0`} size={18} />
            <h3 className="font-semibold text-sm text-foreground">Violations</h3>
          </div>
          <p className="text-xs text-muted-foreground">Security threshold</p>
        </div>
        <StatusIcon className={`${statusColor} flex-shrink-0`} size={20} />
      </div>

      {/* Main Counter Display */}
      <div className="mb-5 space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Current</p>
            <p className={`text-3xl font-bold ${statusColor}`}>
              {totalViolations}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-muted-foreground mb-1">Limit</p>
            <p className="text-lg font-semibold text-foreground">
              {violationThreshold}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-full ${progressColor} transition-all duration-300`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-muted-foreground">
              {percentage}% of limit
            </span>
            <span className={`text-xs font-bold px-2 py-1 rounded ${statusColor.replace('text-', 'bg-').replace('600', '100')}`}>
              {statusLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="border-t border-current/10 pt-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-muted-foreground">Remaining</span>
          <span className={`font-bold ${statusColor}`}>{remaining}</span>
        </div>

        {isCritical && (
          <div className="mt-3 p-3 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700">
            <p className="text-xs font-semibold text-red-700 dark:text-red-400">
              ⚠️ Threshold reached! Auto-submit active.
            </p>
          </div>
        )}

        {isWarning && !isCritical && (
          <div className="mt-3 p-3 rounded-lg bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
              ⚡ Approaching limit - Stay focused!
            </p>
          </div>
        )}

        {!isWarning && !isCritical && (
          <div className="mt-3 p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700">
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              ✓ You're doing great! Keep it up.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

export const ViolationThresholdPanel = memo(ViolationThresholdPanelComponent);
