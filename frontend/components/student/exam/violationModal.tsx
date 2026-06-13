"use client";

import { memo } from "react";
import { AlertTriangle, AlertCircle, X } from "lucide-react";
import type { ExamViolation } from "@/types/exams/examSession";

interface ViolationModalProps {
  violation: ExamViolation | null;
  totalViolations: number;
  violationThreshold: number;
  onClose: () => void;
}

const ViolationModal = memo(function ViolationModal({
  violation,
  totalViolations,
  violationThreshold,
  onClose,
}: ViolationModalProps) {
  if (!violation) return null;

  const isThresholdReached = totalViolations >= violationThreshold;
  const getRemainingViolations = () => Math.max(0, violationThreshold - totalViolations);

  const violationTypeLabel: Record<string, string> = {
    TAB_SWITCH: "Tab Switch Detected",
    WINDOW_BLUR: "Window Blur Detected",
    FULLSCREEN_EXIT: "Fullscreen Exit",
    COPY_ATTEMPT: "Copy Attempt",
    PASTE_ATTEMPT: "Paste Attempt",
    RIGHT_CLICK: "Right-Click Attempt",
    DEVICE_CHANGE: "Device Change Detected",
  };

  const violationEmoji: Record<string, string> = {
    TAB_SWITCH: "🔄",
    WINDOW_BLUR: "👁️",
    FULLSCREEN_EXIT: "⛶",
    COPY_ATTEMPT: "📋",
    PASTE_ATTEMPT: "📌",
    RIGHT_CLICK: "🖱️",
    DEVICE_CHANGE: "📱",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-card border border-border/50 p-6 shadow-lg animate-in fade-in zoom-in-95">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={24} />
        </button>

        {/* Icon and Header */}
        <div className="flex items-start gap-3 mb-4">
          <div
            className={`rounded-lg p-3 flex-shrink-0 ${
              violation.severity === "CRITICAL"
                ? "bg-red-500/20 text-red-600"
                : "bg-amber-500/20 text-amber-600"
            }`}
          >
            {violation.severity === "CRITICAL" ? (
              <AlertTriangle size={28} />
            ) : (
              <AlertCircle size={28} />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground">
              {violationEmoji[violation.type]} {violationTypeLabel[violation.type] || violation.type}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{violation.description}</p>
          </div>
        </div>

        {/* Violation Details */}
        <div className="bg-muted/40 rounded-lg p-4 mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Severity:</span>
            <span
              className={`font-semibold ${
                violation.severity === "CRITICAL"
                  ? "text-red-600"
                  : "text-amber-600"
              }`}
            >
              {violation.severity}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Time:</span>
            <span className="font-semibold text-foreground">
              {violation.timestamp.toLocaleTimeString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Violations:</span>
            <span className="font-semibold text-foreground">{totalViolations}</span>
          </div>
        </div>

        {/* Threshold Warning */}
        {isThresholdReached ? (
          <div className="bg-red-50/30 border border-red-200/50 rounded-lg p-3 mb-4">
            <p className="text-sm font-semibold text-red-700">
              ⚠️ Violation Threshold Reached!
            </p>
            <p className="text-xs text-red-600 mt-1">
              Your exam may be automatically submitted or flagged for review based on violation threshold.
            </p>
          </div>
        ) : (
          <div className="bg-amber-50/30 border border-amber-200/50 rounded-lg p-3 mb-4">
            <p className="text-sm font-medium text-amber-700">
              Remaining Violations Allowed: {getRemainingViolations()}
            </p>
            <div className="mt-2 h-2 bg-amber-200/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all"
                style={{
                  width: `${Math.min((totalViolations / violationThreshold) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="bg-blue-50/30 border border-blue-200/50 rounded-lg p-3 mb-4">
          <p className="text-xs font-semibold text-blue-700 mb-2">💡 Tips to Avoid Violations:</p>
          <ul className="text-xs text-blue-600 space-y-1">
            <li>• Keep the exam window in focus</li>
            <li>• Do not switch tabs or windows</li>
            <li>• Use fullscreen mode if required</li>
            <li>• Avoid copy/paste operations</li>
          </ul>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-2 font-medium transition-colors"
        >
          Acknowledge & Continue
        </button>
      </div>
    </div>
  );
});

export default ViolationModal;
