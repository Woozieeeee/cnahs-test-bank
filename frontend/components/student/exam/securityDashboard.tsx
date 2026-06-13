"use client";

import { memo } from "react";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Eye, Clipboard, Mouse, Smartphone } from "lucide-react";
import type { SecurityMetrics } from "@/types/exams/examSession";

interface SecurityDashboardProps {
  metrics: SecurityMetrics;
  violationThreshold: number;
}

const SecurityDashboard = memo(function SecurityDashboard({
  metrics,
  violationThreshold,
}: SecurityDashboardProps) {
  const getViolationStatus = () => {
    if (metrics.totalViolations >= violationThreshold) {
      return { label: "THRESHOLD REACHED", color: "text-red-600" };
    }
    if (metrics.totalViolations >= violationThreshold * 0.8) {
      return { label: "CRITICAL", color: "text-orange-600" };
    }
    if (metrics.totalViolations > 0) {
      return { label: "WARNING", color: "text-amber-600" };
    }
    return { label: "CLEAR", color: "text-emerald-600" };
  };

  const status = getViolationStatus();
  const remainingAllowed = Math.max(0, violationThreshold - metrics.totalViolations);

  const metricItem = (
    icon: React.ReactNode,
    label: string,
    count: number,
    type: string
  ) => (
    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/20 transition-colors">
      <div className="flex items-center gap-3">
        <div className="bg-muted/40 rounded-lg p-2 text-muted-foreground">{icon}</div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">{type}</p>
        </div>
      </div>
      <div className={`text-2xl font-bold ${count > 0 ? "text-amber-600" : "text-muted-foreground"}`}>
        {count}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Status Header */}
      <Card className="rounded-lg p-5 border border-border/50 bg-gradient-to-r from-muted/50 to-muted/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Security Status</p>
            <h3 className={`text-2xl font-bold ${status.color}`}>{status.label}</h3>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">Violations</p>
            <p className="text-3xl font-bold text-foreground">
              {metrics.totalViolations} <span className="text-lg text-muted-foreground">/ {violationThreshold}</span>
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-2 bg-muted/40 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              metrics.totalViolations >= violationThreshold
                ? "bg-red-500"
                : metrics.totalViolations >= violationThreshold * 0.8
                ? "bg-orange-500"
                : metrics.totalViolations > 0
                ? "bg-amber-500"
                : "bg-emerald-500"
            }`}
            style={{
              width: `${Math.min((metrics.totalViolations / violationThreshold) * 100, 100)}%`,
            }}
          />
        </div>

        {remainingAllowed > 0 && metrics.totalViolations > 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            {remainingAllowed} violation{remainingAllowed !== 1 ? "s" : ""} remaining before action
          </p>
        )}
      </Card>

      {/* Violation Metrics */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground">Detection Metrics</h4>

        {metricItem(
          <Eye size={20} />,
          "Tab Switches",
          metrics.tabSwitches,
          "Tab visibility changes"
        )}

        {metricItem(
          <Eye size={20} />,
          "Window Blurs",
          metrics.windowBlurs,
          "Lost focus events"
        )}

        {metricItem(
          <Clipboard size={20} />,
          "Copy Attempts",
          metrics.copyAttempts,
          "Clipboard copy actions"
        )}

        {metricItem(
          <Clipboard size={20} />,
          "Paste Attempts",
          metrics.pasteAttempts,
          "Clipboard paste actions"
        )}

        {metricItem(
          <Mouse size={20} />,
          "Right Clicks",
          metrics.rightClicks,
          "Context menu attempts"
        )}

        {metricItem(
          <Smartphone size={20} />,
          "Device Changes",
          metrics.deviceChanges,
          "Hardware property changes"
        )}
      </div>

      {/* Security Tips */}
      {metrics.totalViolations > 0 && (
        <Card className="rounded-lg p-4 border border-amber-200/50 bg-amber-50/30">
          <div className="flex items-start gap-2">
            <AlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-700">Security Alert</p>
              <p className="text-xs text-amber-600 mt-1">
                Suspicious activity detected. Continue with caution or violations may result in exam termination.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
});

export default SecurityDashboard;
