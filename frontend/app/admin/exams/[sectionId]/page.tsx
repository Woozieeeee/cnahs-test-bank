"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MotionPage from "@/components/motion/motionPage";
import PageContainer from "@/components/layout/pages/pageContainer";
import ExamCard from "@/components/admin/exams/cards/examCard";
import ViolationsModal from "@/components/admin/exams/violationsModal";
import { getExamSectionDetails } from "@/services/admin_service";
import { ChevronLeft, AlertCircle } from "lucide-react";

interface ExamData {
  id: number;
  title: string;
  code: string;
  subject: string;
  status: string;
  difficulty: string;
  startsAt: string | null;
  endsAt: string | null;
  totalQuestions: number;
  totalAttempts: number;
  totalViolations: number;
  unresolvedViolations: number;
}

interface SectionDetail {
  id: number;
  name: string;
  code: string;
  program: string;
  yearLevel: number;
  totalStudents: number;
  activeStudents: number;
  exams: ExamData[];
  violations: {
    total: number;
    unresolved: number;
    resolved: number;
    bySeverity: {
      LOW: number;
      MEDIUM: number;
      HIGH: number;
    };
  };
}

export default function ExamSectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const sectionId = params?.sectionId as string;

  const [section, setSection] = useState<SectionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);
  const [showViolations, setShowViolations] = useState(false);

  useEffect(() => {
    if (!sectionId) return;

    const fetchSectionDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getExamSectionDetails(parseInt(sectionId));
        setSection(data.data);
      } catch (err) {
        console.error("Error fetching section details:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchSectionDetail();
  }, [sectionId]);

  const handleViewViolations = (examId: number) => {
    setSelectedExamId(examId);
    setShowViolations(true);
  };

  if (loading) {
    return (
      <MotionPage>
        <PageContainer>
          <div className="flex items-center justify-center py-24">
            <div className="text-gray-500">Loading exam details...</div>
          </div>
        </PageContainer>
      </MotionPage>
    );
  }

  if (error || !section) {
    return (
      <MotionPage>
        <PageContainer>
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <AlertCircle size={48} className="text-red-500" />
            <div className="text-center">
              <h2 className="text-lg font-semibold text-foreground">
                Error Loading Section
              </h2>
              <p className="text-muted-foreground mt-2">
                {error || "Section not found"}
              </p>
            </div>
            <button
              onClick={() => router.back()}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
            >
              Go Back
            </button>
          </div>
        </PageContainer>
      </MotionPage>
    );
  }

  const activeExams = section.exams.filter(
    (exam) => exam.status === "ONGOING" || exam.status === "IN_PROGRESS"
  );

  return (
    <MotionPage>
      <PageContainer>
        {/* HEADER */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition mb-4"
          >
            <ChevronLeft size={20} />
            <span className="text-sm font-medium">Back to Exams</span>
          </button>

          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {section.name}
              </h1>
              <p className="text-muted-foreground mt-2">
                {section.code} • {section.program} • Year {section.yearLevel}
              </p>
            </div>
          </div>

          {/* OVERVIEW STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card border-border rounded-lg border p-4">
              <p className="text-xs text-muted-foreground uppercase font-semibold">
                Total Students
              </p>
              <p className="text-2xl font-bold text-foreground mt-2">
                {section.totalStudents}
              </p>
            </div>

            <div className="bg-card border-border rounded-lg border p-4">
              <p className="text-xs text-muted-foreground uppercase font-semibold">
                Active Now
              </p>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                {section.activeStudents}
              </p>
            </div>

            <div className="bg-card border-border rounded-lg border p-4">
              <p className="text-xs text-muted-foreground uppercase font-semibold">
                Total Exams
              </p>
              <p className="text-2xl font-bold text-foreground mt-2">
                {section.exams.length}
              </p>
            </div>

            <div className="bg-card border-border rounded-lg border p-4">
              <p className="text-xs text-muted-foreground uppercase font-semibold">
                Violations
              </p>
              <p className="text-2xl font-bold text-red-600 mt-2">
                {section.violations.total}
              </p>
              {section.violations.unresolved > 0 && (
                <p className="text-xs text-red-500 mt-1">
                  {section.violations.unresolved} unresolved
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ACTIVE EXAMS ALERT */}
        {activeExams.length > 0 && (
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900">
                  {activeExams.length} Active Exam{activeExams.length !== 1 ? "s" : ""}
                </h3>
                <p className="text-sm text-blue-800 mt-1">
                  {activeExams.map((e) => e.title).join(", ")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* EXAMS GRID */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-6">
            All Exams ({section.exams.length})
          </h2>

          {section.exams.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {section.exams.map((exam) => (
                <ExamCard
                  key={exam.id}
                  exam={exam}
                  onViewViolations={handleViewViolations}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 bg-muted/30 rounded-lg border border-border">
              <p>No exams found for this section</p>
            </div>
          )}
        </div>

        {/* VIOLATIONS MODAL */}
        {showViolations && selectedExamId && (
          <ViolationsModal
            examId={selectedExamId}
            isOpen={showViolations}
            onClose={() => setShowViolations(false)}
          />
        )}
      </PageContainer>
    </MotionPage>
  );
}
