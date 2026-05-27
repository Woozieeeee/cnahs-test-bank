"use client";

import MotionPage from "@/components/motion/motionPage";

import SectionGrid from "@/components/admin/exams/sectionGrid";

export default function AdminExamsPage() {
  return (
    <MotionPage>
      <div className="space-y-6">
        {/* HEADER */}

        <div>
          <h1
            className="
              text-3xl
              font-bold
              text-foreground
            "
          >
            Exam Monitoring
          </h1>

          <p className="mt-2 text-muted-foreground">
            Monitor ongoing exams, violations, and section
            activity in real time.
          </p>
        </div>

        {/* SECTION GRID */}

        <SectionGrid />
      </div>
    </MotionPage>
  );
}
