"use client";

import { memo, useEffect, useState } from "react";
import type { ExamViolation } from "@/types/exams/examMonitoring";
import { markViolationResolved } from "@/services/faculty/exams/monitoring";
import { successToast, errorToast } from "@/lib/swal";

interface Props {
  violation: ExamViolation;
  onResolve?: (violationId: number) => void;
  onFlagStudent?: (studentId: number) => void;
  onDismiss?: () => void;
  autoDismiss?: boolean;
  dismissAfter?: number; // milliseconds
}

function ViolationAlert({ 
  violation, 
  onResolve, 
  onFlagStudent, 
  onDismiss, 
  autoDismiss = true,
  dismissAfter = 10000 
}: Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [isResolving, setIsResolving] = useState(false);

  useEffect(() => {
    if (autoDismiss && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onDismiss?.();
      }, dismissAfter);

      return () => clearTimeout(timer);
    }
  }, [autoDismiss, isVisible, dismissAfter, onDismiss]);

  if (!isVisible) return null;

  const getSeverityColor = () => {
    switch (violation.severity) {
      case "HIGH":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-800",
          icon: "🔴"
        };
      case "MEDIUM":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          text: "text-yellow-800",
          icon: "🟡"
        };
      case "LOW":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-800",
          icon: "🔵"
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          text: "text-gray-800",
          icon: "⚪"
        };
    }
  };

  const getViolationIcon = (type: ExamViolation["type"]) => {
    switch (type) {
      case "TAB_SWITCH":
        return "↔️ Tab Switch";
      case "WINDOW_BLUR":
        return "💻 Window Blur";
      case "DEVICE_CHANGE":
        return "📱 Device Change";
      case "MULTIPLE_FACES":
        return "👥 Multiple Faces";
      case "NO_FACE":
        return "👤 No Face";
      case "SUSPICIOUS_ACTIVITY":
        return "🔍 Suspicious Activity";
      default:
        return "⚠️ Violation";
    }
  };

  const handleResolve = async () => {
    try {
      setIsResolving(true);
      await markViolationResolved(violation.id);
      successToast("Violation marked as resolved");
      onResolve?.(violation.id);
      setIsVisible(false);
    } catch (error) {
      console.error("Failed to resolve violation:", error);
      errorToast("Failed to resolve violation");
    } finally {
      setIsResolving(false);
    }
  };

  const handleFlag = () => {
    onFlagStudent?.(violation.studentId);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const colors = getSeverityColor();
  const timeAgo = new Date(violation.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className={`fixed bottom-4 right-4 z-50 w-96 animate-fadeInUp rounded-lg border ${colors.border} ${colors.bg} p-4 shadow-lg`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className={`rounded-full ${colors.bg} p-2 ${colors.border}`}>
            <span className="text-xl">{colors.icon}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className={`font-semibold ${colors.text}`}>
                {getViolationIcon(violation.type)}
              </h4>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                violation.severity === "HIGH" ? "bg-red-100 text-red-700" :
                violation.severity === "MEDIUM" ? "bg-yellow-100 text-yellow-700" :
                "bg-blue-100 text-blue-700"
              }`}>
                {violation.severity}
              </span>
            </div>
            <p className="mt-1 text-sm font-medium">
              {violation.studentName}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              {violation.metadata.description}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Detected at {timeAgo}
            </p>
            {violation.metadata.details && (
              <p className="mt-2 text-xs text-gray-500">
                {violation.metadata.details}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={handleFlag}
          disabled={violation.resolved}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium ${
            violation.resolved
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
          }`}
        >
          {violation.resolved ? "Already Flagged" : "Flag Student"}
        </button>
        <button
          onClick={handleResolve}
          disabled={isResolving || violation.resolved}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium ${
            violation.resolved
              ? "bg-green-100 text-green-400 cursor-not-allowed"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
        >
          {isResolving ? "Resolving..." : violation.resolved ? "Resolved ✓" : "Mark Resolved"}
        </button>
      </div>

      {autoDismiss && (
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-gray-200">
          <div 
            className="h-full bg-gray-400 animate-shrink"
            style={{ 
              animationDuration: `${dismissAfter}ms`,
              animationTimingFunction: 'linear'
            }}
          />
        </div>
      )}
    </div>
  );
}

export default memo(ViolationAlert);