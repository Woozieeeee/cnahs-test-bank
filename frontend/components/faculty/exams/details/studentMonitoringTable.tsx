"use client";

import { memo, useState, useMemo, useEffect } from "react";
import type { Exam } from "@/types/exams/examMonitoring";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import Pagination from "@/components/common/pagination";
import StudentActionsMenu from "@/components/faculty/exams/details/studentActionsMenu";

interface MonitoredStudent {
  id: number;
  name: string;
  studentNumber: string;
  status: "ACTIVE" | "COMPLETED" | "FLAGGED";
  startTime: string;
  submissionTime: string | null;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  score: number | null;
}

interface StudentMonitoringTableProps {
  exam: Exam;
  filterTab: "ALL" | "ACTIVE" | "COMPLETED" | "FLAGGED";
  itemsPerPage?: number;
  actingStudentId?: number | null;
  onFlagStudent?: (studentId: number, studentName: string, reason?: string) => Promise<void>;
  onUnlockStudent?: (studentId: number, studentName: string) => Promise<void>;
  onNotifyStudent?: (studentId: number, message: string) => Promise<void>;
}

function StudentMonitoringTable({
  exam,
  filterTab,
  itemsPerPage = 10,
  actingStudentId = null,
  onFlagStudent,
  onUnlockStudent,
  onNotifyStudent,
}: StudentMonitoringTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const students: MonitoredStudent[] = useMemo(() => {
    if (exam.studentMonitoring?.length) {
      return exam.studentMonitoring.map((student) => ({
        id: student.id,
        name: student.name,
        studentNumber: student.studentNumber,
        status: student.status,
        startTime: student.startTime
          ? new Date(student.startTime).toLocaleTimeString()
          : "N/A",
        submissionTime: student.submissionTime
          ? new Date(student.submissionTime).toLocaleTimeString()
          : null,
        riskLevel: student.riskLevel,
        score: student.score,
      }));
    }

    return (exam.attempts || []).map((attempt) => {
      let status: "ACTIVE" | "COMPLETED" | "FLAGGED" = "ACTIVE";
      if (attempt.status === "FLAGGED") status = "FLAGGED";
      else if (["SUBMITTED", "AUTO_SUBMITTED", "COMPLETED"].includes(attempt.status)) {
        status = "COMPLETED";
      }

      return {
        id: attempt.studentId,
        name: attempt.student?.name || "Unknown",
        studentNumber: attempt.student?.studentId || "N/A",
        status,
        startTime: attempt.startedAt
          ? new Date(attempt.startedAt).toLocaleTimeString()
          : "N/A",
        submissionTime: attempt.submittedAt
          ? new Date(attempt.submittedAt).toLocaleTimeString()
          : null,
        riskLevel: "LOW" as const,
        score: attempt.score ?? null,
      };
    });
  }, [exam.attempts, exam.studentMonitoring]);

  const filteredStudents = students.filter((student) => {
    if (filterTab === "ALL") return true;
    return student.status === filterTab;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filterTab]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStudents, currentPage, itemsPerPage]);

  const showActions = Boolean(onFlagStudent && onUnlockStudent && onNotifyStudent);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Clock className="h-4 w-4" />;
      case "COMPLETED":
        return <CheckCircle className="h-4 w-4" />;
      case "FLAGGED":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "LOW":
        return "bg-green-100 text-green-700";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-700";
      case "HIGH":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="p-5">
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-sm font-semibold">Student</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Student #</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Started</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Submitted</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Risk</th>
                {showActions && (
                  <th className="px-4 py-3 text-right text-sm font-semibold">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={showActions ? 7 : 6} className="px-4 py-8 text-center">
                    <p className="text-muted-foreground">No students found</p>
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student) => (
                  <StudentRow
                    key={student.id}
                    student={student}
                    getStatusIcon={getStatusIcon}
                    getRiskColor={getRiskColor}
                    showActions={showActions}
                    isLoading={actingStudentId === student.id}
                    onFlag={
                      onFlagStudent
                        ? (reason) => onFlagStudent(student.id, student.name, reason)
                        : undefined
                    }
                    onUnlock={
                      onUnlockStudent
                        ? () => onUnlockStudent(student.id, student.name)
                        : undefined
                    }
                    onNotify={
                      onNotifyStudent
                        ? (message) => onNotifyStudent(student.id, message)
                        : undefined
                    }
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="border-t border-border pt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}

        {filteredStudents.length > 0 && (
          <div className="mt-4 text-xs text-muted-foreground text-center">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of{" "}
            {filteredStudents.length} students
          </div>
        )}
      </div>
    </div>
  );
}

const StudentRow = memo(function StudentRow({
  student,
  getStatusIcon,
  getRiskColor,
  showActions,
  isLoading,
  onFlag,
  onUnlock,
  onNotify,
}: {
  student: MonitoredStudent;
  getStatusIcon: (status: string) => React.ReactNode;
  getRiskColor: (riskLevel: string) => string;
  showActions: boolean;
  isLoading: boolean;
  onFlag?: (reason?: string) => Promise<void>;
  onUnlock?: () => Promise<void>;
  onNotify?: (message: string) => Promise<void>;
}) {
  return (
    <tr className="border-b border-border hover:bg-muted/30 transition-colors">
      <td className="px-4 py-3 text-sm font-medium">{student.name}</td>
      <td className="px-4 py-3 text-sm text-muted-foreground">{student.studentNumber}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm">{getStatusIcon(student.status)}</span>
          <span className="text-sm font-medium">{student.status}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-sm">{student.startTime}</td>
      <td className="px-4 py-3 text-sm">{student.submissionTime || "-"}</td>
      <td className="px-4 py-3">
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${getRiskColor(student.riskLevel)}`}
        >
          {student.riskLevel}
        </span>
      </td>
      {showActions && onFlag && onUnlock && onNotify && (
        <td className="px-4 py-3 text-right">
          <StudentActionsMenu
            studentName={student.name}
            status={student.status}
            isLoading={isLoading}
            onFlag={onFlag}
            onUnlock={onUnlock}
            onNotify={onNotify}
          />
        </td>
      )}
    </tr>
  );
});

export default memo(StudentMonitoringTable);
