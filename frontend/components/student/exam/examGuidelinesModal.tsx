"use client";

import { memo, useState } from "react";
import { AlertCircle, CheckCircle2, X, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ExamGuidelinesModalProps {
  visible: boolean;
  examTitle: string;
  duration: number;
  totalQuestions: number;
  passingScore: number;
  securityFeatures: {
    requireFullscreen: boolean;
    detectTabSwitch: boolean;
    detectWindowBlur: boolean;
    blockCopy: boolean;
    blockPaste: boolean;
    blockRightClick: boolean;
  };
  onConfirm: () => void;
  onCancel: () => void;
}

const ExamGuidelinesModal = memo(function ExamGuidelinesModal({
  visible,
  examTitle,
  duration,
  totalQuestions,
  passingScore,
  securityFeatures,
  onConfirm,
  onCancel,
}: ExamGuidelinesModalProps) {
  if (!visible) return null;
  const [expandedSection, setExpandedSection] = useState<string | null>("important");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const GuidelineSection = ({
    title,
    icon,
    id,
    children,
  }: {
    title: string;
    icon: React.ReactNode;
    id: string;
    children: React.ReactNode;
  }) => (
    <div className="border border-border/50 rounded-lg overflow-hidden">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/20 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="text-muted-foreground">{icon}</div>
          <h4 className="font-semibold text-foreground">{title}</h4>
        </div>
        {expandedSection === id ? (
          <ChevronUp size={20} className="text-muted-foreground" />
        ) : (
          <ChevronDown size={20} className="text-muted-foreground" />
        )}
      </button>
      {expandedSection === id && (
        <div className="border-t border-border/30 px-4 py-3 bg-muted/20 text-sm text-muted-foreground space-y-2">
          {children}
        </div>
      )}
    </div>
  );

  const securityFeaturesList = [
    securityFeatures.requireFullscreen && "Fullscreen Mode Required",
    securityFeatures.detectTabSwitch && "Tab Switching Detection",
    securityFeatures.detectWindowBlur && "Window Focus Monitoring",
    securityFeatures.blockCopy && "Copy Operations Blocked",
    securityFeatures.blockPaste && "Paste Operations Blocked",
    securityFeatures.blockRightClick && "Right-Click Disabled",
  ].filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] rounded-2xl bg-card border border-border/50 shadow-xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="border-b border-border/30 p-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{examTitle}</h2>
            <p className="text-sm text-muted-foreground">
              Please review these guidelines before starting the exam
            </p>
          </div>
          <button
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Exam Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <Card className="p-3 bg-muted/30 border-border/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Duration</p>
              <p className="text-lg font-bold text-foreground">{duration}m</p>
            </Card>
            <Card className="p-3 bg-muted/30 border-border/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Questions</p>
              <p className="text-lg font-bold text-foreground">{totalQuestions}</p>
            </Card>
            <Card className="p-3 bg-muted/30 border-border/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Passing Score</p>
              <p className="text-lg font-bold text-foreground">{passingScore}%</p>
            </Card>
            <Card className="p-3 bg-muted/30 border-border/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Per Question</p>
              <p className="text-lg font-bold text-foreground">
                {Math.round((duration / totalQuestions) * 10) / 10}m
              </p>
            </Card>
          </div>

          {/* Important Guidelines */}
          <GuidelineSection
            id="important"
            title="⚠️ Important Guidelines"
            icon={<AlertCircle size={20} />}
          >
            <ul className="space-y-2 list-disc list-inside">
              <li>You cannot pause or resume the exam once started</li>
              <li>The timer continues regardless of your activity</li>
              <li>All answers must be submitted before time runs out</li>
              <li>Leaving the exam will be recorded as incomplete</li>
              <li>Do not refresh the page during the exam</li>
              <li>Ensure stable internet connection before starting</li>
            </ul>
          </GuidelineSection>

          {/* Security & Monitoring */}
          <GuidelineSection
            id="security"
            title="🛡️ Security & Monitoring"
            icon={<AlertCircle size={20} />}
          >
            <div className="space-y-3">
              <p className="font-medium text-foreground">
                Active Security Measures:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {securityFeaturesList.length > 0 ? (
                  securityFeaturesList.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm">Standard monitoring enabled</p>
                )}
              </div>
              <p className="text-xs italic mt-2">
                Suspicious activity may result in automatic exam termination or flagging for review.
              </p>
            </div>
          </GuidelineSection>

          {/* Permitted & Prohibited */}
          <GuidelineSection
            id="rules"
            title="✅ Permitted & ❌ Prohibited"
            icon={<CheckCircle2 size={20} />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-emerald-600 mb-2">✅ Permitted</p>
                <ul className="space-y-1 text-sm">
                  <li>• Taking notes on paper</li>
                  <li>• Using scratch paper/whiteboard</li>
                  <li>• Using a calculator (if allowed)</li>
                  <li>• Reviewing previous questions</li>
                  <li>• Bookmarking difficult questions</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-red-600 mb-2">❌ Prohibited</p>
                <ul className="space-y-1 text-sm">
                  <li>• Copying exam content</li>
                  <li>• Pasting external content</li>
                  <li>• Switching tabs/windows</li>
                  <li>• Minimizing browser window</li>
                  <li>• Screen sharing or recording</li>
                  <li>• Using external resources/help</li>
                </ul>
              </div>
            </div>
          </GuidelineSection>

          {/* Tips for Success */}
          <GuidelineSection
            id="tips"
            title="💡 Tips for Success"
            icon={<AlertCircle size={20} />}
          >
            <ul className="space-y-2 text-sm">
              <li>• <strong>Read carefully:</strong> Understand each question before answering</li>
              <li>• <strong>Manage time:</strong> Don't spend too long on difficult questions</li>
              <li>• <strong>Review:</strong> Go back and review your answers if time permits</li>
              <li>• <strong>Stay focused:</strong> Minimize distractions in your environment</li>
              <li>• <strong>Breathe:</strong> Stay calm and composed throughout the exam</li>
            </ul>
          </GuidelineSection>

          {/* Technical Requirements */}
          <GuidelineSection
            id="technical"
            title="💻 Technical Requirements"
            icon={<AlertCircle size={20} />}
          >
            <ul className="space-y-2 text-sm">
              <li>• Modern web browser (Chrome, Firefox, Safari, Edge)</li>
              <li>• Stable internet connection (minimum 1 Mbps recommended)</li>
              <li>• JavaScript must be enabled</li>
              <li>• Pop-ups must be allowed</li>
              <li>• Cookies and local storage must be enabled</li>
              <li>• Monitor resolution: 1024x768 or higher recommended</li>
            </ul>
          </GuidelineSection>
        </div>

        {/* Footer */}
        <div className="border-t border-border/30 bg-muted/20 p-6 space-y-4">
          {/* Terms Agreement */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-border"
            />
            <span className="text-sm text-muted-foreground">
              I understand and agree to follow all guidelines and security measures. I acknowledge
              that suspicious activity may result in exam termination or flagging for review.
            </span>
          </label>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 rounded-lg border border-border/50 hover:bg-muted/20 text-foreground font-medium transition-colors"
            >
              Cancel & Go Back
            </button>
            <button
              onClick={onConfirm}
              disabled={!agreedToTerms}
              className="flex-1 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors"
            >
              I Agree & Start Exam
            </button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Good luck! 🍀
          </p>
        </div>
      </div>
    </div>
  );
});

export default ExamGuidelinesModal;
