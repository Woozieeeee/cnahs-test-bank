"use client";

import { useState, memo } from "react";
import { useParams } from "next/navigation";
import useProtectedRoute from "@/hooks/auth/useProtectedRoute";
import { useSubjectDetails } from "@/hooks/student/useSubjectDetails";
import PageContainer from "@/components/layout/pages/pageContainer";
import PageHeader from "@/components/layout/pages/pageHeader";
import PageTitle from "@/components/layout/pages/pageTitle";
import { Card } from "@/components/ui/card";
import { Loader2, AlertCircle, ArrowLeft, RotateCcw } from "lucide-react";
import { TierBreakdown } from "@/components/student/subjects/tierBreakdown";
import { TierTabs } from "@/components/student/subjects/tierTabs";
import { TierContent } from "@/components/student/subjects/tierContent";
import Link from "next/link";

type DifficultyTier = "EASY" | "MEDIUM" | "HARD" | "EXPERT";

function StudentSubjectDetailsPageComponent() {
  const params = useParams();
  const subjectIdOrSlug = params.subjectId as string;
  const { loading: authLoading, isAuthenticated } = useProtectedRoute(["STUDENT"]);
  const [selectedTab, setSelectedTab] = useState<DifficultyTier>("EASY");

  // Pass the slug/ID directly to the hook - it will handle both
  const { subjectData, isLoading, error, handleManualRefresh } =
    useSubjectDetails(subjectIdOrSlug, isAuthenticated, authLoading);

  if (authLoading || !isAuthenticated) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      </PageContainer>
    );
  }

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex items-center gap-2 mb-6">
          <Link href="/student/subjects" className="hover:text-primary transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <Link href="/student/subjects" className="hover:text-primary transition-colors text-sm">
            Back to Subjects
          </Link>
        </div>
        <PageHeader>
          <PageTitle
            title="Subject Details"
            description="Loading subject information..."
          />
        </PageHeader>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      </PageContainer>
    );
  }

  if (error || !subjectData) {
    return (
      <PageContainer>
        <div className="flex items-center gap-2 mb-6">
          <Link href="/student/subjects" className="hover:text-primary transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <Link href="/student/subjects" className="hover:text-primary transition-colors text-sm">
            Back to Subjects
          </Link>
        </div>
        <PageHeader>
          <PageTitle title="Subject Details" description="Subject information" />
        </PageHeader>
        <div className="mt-8">
          <Card className="border-destructive/30 bg-destructive/10 p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-destructive" size={24} />
              <div>
                <h3 className="font-semibold text-destructive">
                  Failed to Load Subject Details
                </h3>
                <p className="text-sm text-destructive/80 mt-1">
                  {error || "An unexpected error occurred."}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </PageContainer>
    );
  }

  const currentTier = subjectData.tiers[selectedTab];

  return (
    <PageContainer>
      {/* Back Button and Refresh */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link
            href="/student/subjects"
            className="hover:text-primary transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <Link
            href="/student/subjects"
            className="hover:text-primary transition-colors text-sm"
          >
            Back to Subjects
          </Link>
        </div>
        <button
          onClick={handleManualRefresh}
          className="flex items-center gap-2 px-3 py-1 rounded-lg border border-border hover:border-primary transition-all"
        >
          <RotateCcw size={16} />
          <span className="text-sm">Refresh</span>
        </button>
      </div>

      {/* Subject Header */}
      <PageHeader>
        <PageTitle
          title={subjectData.name}
          description={`${subjectData.code} • ${subjectData.totalExams} exam${subjectData.totalExams !== 1 ? "s" : ""}`}
        />
      </PageHeader>

      {/* Tier Breakdown */}
      <div className="mt-8">
        <TierBreakdown subjectData={subjectData} />
      </div>

      {/* Difficulty Tabs */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Difficulty Tiers
        </h2>

        <TierTabs
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          subjectData={subjectData}
        />

        {/* Tier Content with Smooth Transitions */}
        <div className="animate-in fade-in-50 duration-300">
          <TierContent tier={selectedTab} tierData={currentTier} />
        </div>
      </div>
    </PageContainer>
  );
}

const StudentSubjectDetailsPage = memo(StudentSubjectDetailsPageComponent);
export default StudentSubjectDetailsPage;
