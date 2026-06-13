import { memo } from "react";
import { Card } from "@/components/ui/card";
import {
  Shield,
  Check,
  X,
  Maximize,
  Keyboard,
  Copy,
  Smartphone,
  Eye,
  Shuffle,
} from "lucide-react";
import type { ExamConfig } from "@/types/exams/examSession";

interface SecurityRulesDisplayProps {
  config: ExamConfig;
}

function SecurityRulesDisplayComponent({
  config,
}: SecurityRulesDisplayProps) {
  const rules = [
    {
      label: "Fullscreen Required",
      enabled: config.requireFullscreen,
      icon: Maximize,
    },
    {
      label: "Detect Tab Switching",
      enabled: config.detectTabSwitch,
      icon: Keyboard,
    },
    {
      label: "Detect Window Blur",
      enabled: config.detectWindowBlur,
      icon: Eye,
    },
    {
      label: "Block Copy",
      enabled: config.blockCopy,
      icon: Copy,
    },
    {
      label: "Block Paste",
      enabled: config.blockPaste,
      icon: Copy,
    },
    {
      label: "Block Right-Click",
      enabled: config.blockRightClick,
      icon: Shield,
    },
    {
      label: "Detect Device Change",
      enabled: config.detectDeviceChange,
      icon: Smartphone,
    },
  ];

  const behaviorRules = [
    {
      label: "Randomize Questions",
      enabled: config.randomizeQuestions,
    },
    {
      label: "Randomize Answers",
      enabled: config.randomizeAnswers,
    },
    {
      label: "Show Results Immediately",
      enabled: config.showResultAfterSubmission,
    },
    {
      label: "Reveal Correct Answers",
      enabled: config.showCorrectAnswers,
    },
    {
      label: "Reveal Explanations",
      enabled: config.showExplanations,
    },
  ];

  const enabledSecurityCount = rules.filter((r) => r.enabled).length;
  const enabledBehaviorCount = behaviorRules.filter((r) => r.enabled).length;

  return (
    <div className="space-y-4">
      {/* Security Rules */}
      <Card className="border rounded-lg p-5 border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield className="text-blue-600" size={20} />
            <h3 className="font-semibold text-foreground">Security Rules</h3>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            {enabledSecurityCount} Active
          </span>
        </div>

        <div className="space-y-2">
          {rules.map((rule) => {
            const Icon = rule.icon;
            return (
              <div
                key={rule.label}
                className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={16}
                    className={
                      rule.enabled
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-muted-foreground"
                    }
                  />
                  <span className="text-sm text-foreground">{rule.label}</span>
                </div>
                {rule.enabled ? (
                  <Check
                    size={18}
                    className="text-emerald-600 dark:text-emerald-400 font-bold"
                  />
                ) : (
                  <X
                    size={18}
                    className="text-muted-foreground/50"
                  />
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Exam Behavior Rules */}
      <Card className="border rounded-lg p-5 border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shuffle className="text-purple-600" size={20} />
            <h3 className="font-semibold text-foreground">Exam Behavior</h3>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
            {enabledBehaviorCount} Active
          </span>
        </div>

        <div className="space-y-2">
          {behaviorRules.map((rule) => (
            <div
              key={rule.label}
              className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <span className="text-sm text-foreground">{rule.label}</span>
              {rule.enabled ? (
                <Check
                  size={18}
                  className="text-emerald-600 dark:text-emerald-400 font-bold"
                />
              ) : (
                <X
                  size={18}
                  className="text-muted-foreground/50"
                />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Threshold Info */}
      <Card className="border rounded-lg p-5 border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Violation Threshold
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Maximum violations before action triggers
              </p>
            </div>
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {config.violationThreshold}
            </span>
          </div>
          <div className="border-t border-amber-200 dark:border-amber-700 pt-3">
            <p className="text-xs font-medium text-foreground">Action on Threshold:</p>
            <p className="text-sm font-semibold mt-1">
              {config.thresholdAction === "AUTO_SUBMIT" && (
                <span className="text-red-600 dark:text-red-400">
                  🔴 Auto-Submit Exam
                </span>
              )}
              {config.thresholdAction === "END_EXAM" && (
                <span className="text-red-600 dark:text-red-400">
                  🔴 End Exam Immediately
                </span>
              )}
              {config.thresholdAction === "FLAG_REVIEW" && (
                <span className="text-orange-600 dark:text-orange-400">
                  🟠 Flag for Review
                </span>
              )}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export const SecurityRulesDisplay = memo(SecurityRulesDisplayComponent);
