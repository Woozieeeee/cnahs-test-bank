"use client";

import { useState } from "react";
import MotionPage from "@/components/motion/motionPage";
import AcademicTabs from "@/components/admin/academic/academicTabs";
import SectionsDashboard from "@/components/admin/academic/sections/sectionsDashboard";
import SubjectsDashboard from "@/components/admin/academic/subjects/subjectsDashboard";
import AssignmentsDashboard from "@/components/admin/academic/assignments/assignmentsDashboard";

export default function AcademicPage() {
  const [activeTab, setActiveTab] = useState("SECTIONS");

  return (
    <MotionPage>
      <div className="space-y-6">
        {/* HEADER */}

        <div>
          <h1
            className="
              text-3xl
              font-bold
              text-slate-900
            "
          >
            Academic Management
          </h1>

          <p className="mt-2 text-slate-500">
            Manage sections, subjects, and academic
            assignments.
          </p>
        </div>

        {/* TABS */}

        <AcademicTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* TAB CONTENT */}

        {activeTab === "SECTIONS" && <SectionsDashboard />}

        {activeTab === "SUBJECTS" && <SubjectsDashboard />}

        {activeTab === "ASSIGNMENTS" && (
          <AssignmentsDashboard />
        )}
      </div>
    </MotionPage>
  );
}
