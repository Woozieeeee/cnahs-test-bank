"use client";

import { useMemo, useState } from "react";

import { useParams } from "next/navigation";

import PageContainer from "@/components/layout/pages/pageContainer";

import ExamStudentsHeader from "@/components/admin/academic/sections/students/examStudentHeader";

import ExamStudentsStats from "@/components/admin/academic/sections/students/examStudentsStats";

import ExamStudentsTabs from "@/components/admin/academic/sections/students/examStudentsTabs";

import ExamStudentsList from "@/components/admin/academic/sections/students/examStudentsList";

import { mockExamStudents } from "@/components/admin/academic/sections/data/mockExamStudents";

export default function ExamStudentsPage() {
  const params = useParams();

  const [activeTab, setActiveTab] = useState("ALL");

  const filteredStudents = useMemo(() => {
    if (activeTab === "ALL") {
      return mockExamStudents;
    }

    if (activeTab === "FLAGGED") {
      return mockExamStudents.filter(
        (student) =>
          student.status === "FLAGGED" ||
          student.warnings > 0
      );
    }

    return mockExamStudents.filter(
      (student) => student.status === activeTab
    );
  }, [activeTab]);

  return (
    <PageContainer>
      <ExamStudentsHeader
        sectionId={String(params.id)}
        examId={String(params.examId)}
      />

      <ExamStudentsStats
        total={mockExamStudents.length}
        active={
          mockExamStudents.filter(
            (s) => s.status === "ACTIVE"
          ).length
        }
        finished={
          mockExamStudents.filter(
            (s) => s.status === "FINISHED"
          ).length
        }
        flagged={
          mockExamStudents.filter(
            (s) => s.status === "FLAGGED" || s.warnings > 0
          ).length
        }
      />

      <ExamStudentsTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <ExamStudentsList
        students={filteredStudents}
        sectionId={String(params.id)}
        examId={String(params.examId)}
      />
    </PageContainer>
  );
}
