"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";

interface Violation {
  id: number;
  student: {
    id: number;
    name: string;
    studentId: string;
  };
  type: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  timestamp: string;
  description: string;
  details: string | null;
  resolved: boolean;
  resolvedAt: string | null;
  resolvedBy: string | null;
}

interface ExamData {
  exam: {
    id: number;
    title: string;
    code: string;
    section: { id: number; name: string; code: string };
    subject: { id: number; name: string };
    status: string;
    difficulty: string;
    startsAt: string | null;
    endsAt: string | null;
  };
  summary: {
    total: number;
    resolved: number;
    unresolved: number;
    bySeverity: { LOW: number; MEDIUM: number; HIGH: number };
  };
  violations: Violation[];
}

interface Props {
  examId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ViolationsModal({ examId, isOpen, onClose }: Props) {
  const [data, setData] = useState<ExamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resolving, setResolving] = useState<number | null>(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const fetchViolations = async () => {
      try {
        const response = await fetch(`/api/admin/exams/${examId}/violations`);
        if (!response.ok) {
          throw new Error("Failed to fetch violations");
        }
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchViolations();
  }, [examId, isOpen]);

  const handleResolveViolation = async (violationId: number) => {
    try {
      setResolving(violationId);
      const response = await fetch(
        `/api/admin/violations/${violationId}/resolve`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ notes }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to resolve violation");
      }

      // Refresh data
      setData((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          violations: prev.violations.map((v) =>
            v.id === violationId
              ? { ...v, resolved: true, resolvedAt: new Date().toISOString() }
              : v
          ),
        };
      });

      setNotes("");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error resolving violation");
    } finally {
      setResolving(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold">Exam Violations</h2>
            {data && (
              <p className="text-sm text-muted-foreground mt-1">
                {data.exam.title} • {data.exam.section.name}
              </p>
            )}
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={24} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          {loading && (
            <div className="text-center py-8 text-muted-foreground">
              Loading violations...
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded text-red-800">
              {error}
            </div>
          )}

          {data && !loading && (
            <>
              {/* SUMMARY */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-muted/40 p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold mt-2">{data.summary.total}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-xs text-red-700">Unresolved</p>
                  <p className="text-2xl font-bold text-red-700 mt-2">
                    {data.summary.unresolved}
                  </p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-xs text-amber-700">High Severity</p>
                  <p className="text-2xl font-bold text-amber-700 mt-2">
                    {data.summary.bySeverity.HIGH}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-xs text-green-700">Resolved</p>
                  <p className="text-2xl font-bold text-green-700 mt-2">
                    {data.summary.resolved}
                  </p>
                </div>
              </div>

              {/* VIOLATIONS LIST */}
              <div className="space-y-4">
                {data.violations.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">
                    No violations recorded
                  </p>
                ) : (
                  data.violations.map((violation) => (
                    <div
                      key={violation.id}
                      className={`border rounded-lg p-4 ${
                        violation.resolved
                          ? "bg-green-50/50 border-green-200"
                          : "bg-red-50/50 border-red-200"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {violation.resolved ? (
                              <CheckCircle
                                size={16}
                                className="text-green-600"
                              />
                            ) : (
                              <AlertCircle size={16} className="text-red-600" />
                            )}
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded ${
                                violation.severity === "HIGH"
                                  ? "bg-red-200 text-red-800"
                                  : violation.severity === "MEDIUM"
                                  ? "bg-amber-200 text-amber-800"
                                  : "bg-blue-200 text-blue-800"
                              }`}
                            >
                              {violation.severity}
                            </span>
                          </div>

                          <p className="font-medium text-sm">
                            {violation.student.name} ({violation.student.studentId})
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Type: {violation.type}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(violation.timestamp).toLocaleString()}
                          </p>

                          {violation.description && (
                            <p className="text-sm mt-2 text-foreground">
                              {violation.description}
                            </p>
                          )}

                          {violation.resolved && (
                            <p className="text-xs text-green-700 mt-2">
                              ✓ Resolved by {violation.resolvedBy} on{" "}
                              {new Date(violation.resolvedAt!).toLocaleString()}
                            </p>
                          )}
                        </div>

                        {!violation.resolved && (
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() =>
                                handleResolveViolation(violation.id)
                              }
                              disabled={resolving === violation.id}
                              className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 disabled:opacity-50 transition"
                            >
                              {resolving === violation.id
                                ? "Resolving..."
                                : "Mark Resolved"}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* NOTES INPUT */}
              {data.violations.some((v) => !v.resolved) && (
                <div className="mt-6 pt-6 border-t">
                  <label className="block text-sm font-medium mb-2">
                    Add Notes (optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes about the violation..."
                    className="w-full p-3 border rounded-lg text-sm bg-muted/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    These notes will be added when you mark violations as resolved
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
